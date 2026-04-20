import { useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Button from "@taroify/core/button";
import ArrowLeft from "@taroify/icons/ArrowLeft";
import Clock from "@taroify/icons/Clock";
import Contact from "@taroify/icons/Contact";
import LocationOutlined from "@taroify/icons/LocationOutlined";
import Phone from "@taroify/icons/Phone";
import { getDetailMeals, getDinnerProviders } from "../api/elderlyCareMeal";
import "./index.scss";

const MEAL_TYPES = [
  { key: "早餐", label: "早餐" },
  { key: "午餐", label: "午餐" },
  { key: "晚餐", label: "晚餐" },
];

const DATE_OPTIONS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const formatDate = (date) => {
  const weekLabels = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekLabels[date.getDay()];
};

const parseMealInfo = (value) => {
  if (!value) {
    return {};
  }

  if (typeof value === "object") {
    return value;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return {};
    }
  }

  return {};
};

const normalizeDishText = (item) => {
  if (item === null || item === undefined) {
    return "";
  }

  if (typeof item === "string" || typeof item === "number") {
    return String(item);
  }

  if (typeof item === "object") {
    const preferred = item.name || item.title || item.dish || item.food;
    if (
      preferred !== undefined &&
      preferred !== null &&
      String(preferred).trim()
    ) {
      return String(preferred);
    }

    const values = Object.values(item)
      .map((value) => {
        if (value === null || value === undefined) {
          return "";
        }
        if (typeof value === "object") {
          return "";
        }
        return String(value).trim();
      })
      .filter(Boolean);

    return values.join(" ");
  }

  return "";
};

const normalizeProvider = (item, index) => {
  return {
    id: item?.id ?? item?.provider_id ?? item?.providerId ?? index,
    name:
      item?.name || item?.provider_name || item?.providerName || "未命名供餐点",
    address:
      item?.address || item?.location || item?.provider_address || "暂无地址",
    phone: item?.phone || item?.tel || item?.mobile || "",
    serviceTime:
      item?.service_time || item?.meal_time || item?.serve_time || "",
    bonusInfo: item?.bonus_info || item?.bonusInfo || "",
    mealStyle: item?.meal_style || item?.mealStyle || "",
    latitude: Number(item?.latitude ?? item?.lat),
    longitude: Number(item?.longitude ?? item?.lng),
  };
};

const normalizeMeal = (item, index) => {
  const mealInfo = parseMealInfo(item?.meal_info ?? item?.mealInfo);
  const dishes = Array.isArray(mealInfo?.dishes)
    ? mealInfo.dishes
    : typeof mealInfo?.dishes === "string"
      ? [mealInfo.dishes]
      : [];
  const dishTexts = dishes.map(normalizeDishText).filter(Boolean);
  const calories =
    mealInfo?.calories !== undefined && mealInfo?.calories !== null
      ? String(mealInfo.calories)
      : "";
  const fallbackName =
    item?.name || item?.dish_name || item?.dishName || item?.title || "餐品";

  return {
    id: item?.id ?? item?.meal_id ?? item?.mealId ?? index,
    dishName: dishTexts.length ? dishTexts.join("、") : fallbackName,
    desc:
      item?.description ||
      item?.desc ||
      item?.note ||
      (calories ? `约 ${calories} 千卡` : ""),
  };
};

export default function ElderlyCareMeal() {
  const [providers, setProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [providerErrorText, setProviderErrorText] = useState("");
  const [activeDateTime, setActiveDateTime] = useState(formatDate(new Date()));
  const [activeMealType, setActiveMealType] = useState("午餐");
  const [activeProviderId, setActiveProviderId] = useState(null);
  const [mealMap, setMealMap] = useState({});
  const [mealLoadingMap, setMealLoadingMap] = useState({});
  const [mealErrorMap, setMealErrorMap] = useState({});

  const activeProviderName = useMemo(() => {
    const current = providers.find((item) => item.id === activeProviderId);
    return current?.name || "";
  }, [providers, activeProviderId]);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoadingProviders(true);
      setProviderErrorText("");
      try {
        const res = await getDinnerProviders();
        if (res?.code && res.code !== 200) {
          setProviderErrorText(res?.message || "供餐点接口返回异常");
        }
        const list = Array.isArray(res?.dinner_providers)
          ? res.dinner_providers
          : Array.isArray(res?.dinnerProviders)
            ? res.dinnerProviders
            : Array.isArray(res?.providers)
              ? res.providers
              : Array.isArray(res?.data)
                ? res.data
                : Array.isArray(res)
                  ? res
                  : [];
        const normalized = list.map((item, index) =>
          normalizeProvider(item, index),
        );
        setProviders(normalized);
        if (normalized.length) {
          setActiveProviderId(normalized[0].id);
        }
      } catch {
        setProviders([]);
        setProviderErrorText("供餐点加载失败，请稍后重试");
      } finally {
        setLoadingProviders(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (
      activeProviderId === null ||
      activeProviderId === undefined ||
      !activeProviderName
    ) {
      return;
    }

    const cacheKey = `${activeProviderId}_${activeDateTime}_${activeMealType}`;
    if (mealMap[cacheKey]) {
      return;
    }

    const fetchMeals = async () => {
      setMealLoadingMap((prev) => ({ ...prev, [cacheKey]: true }));
      setMealErrorMap((prev) => ({ ...prev, [cacheKey]: "" }));
      try {
        const dateCandidates = [activeDateTime];
        const typeCandidates = [activeMealType];

        let matchedList = [];
        let errorText = "";

        for (const dateCandidate of dateCandidates) {
          for (const typeCandidate of typeCandidates) {
            try {
              const res = await getDetailMeals({
                belong_to: activeProviderName,
                datetime: dateCandidate,
                type: typeCandidate,
              });

              const list = Array.isArray(res?.detail_meals)
                ? res.detail_meals
                : Array.isArray(res?.detailMeals)
                  ? res.detailMeals
                  : Array.isArray(res?.meals)
                    ? res.meals
                    : Array.isArray(res?.data)
                      ? res.data
                      : Array.isArray(res)
                        ? res
                        : [];

              if (res?.code && res.code !== 200) {
                errorText = res?.message || "菜单接口返回异常";
              }

              if (list.length) {
                matchedList = list;
                break;
              }
            } catch (error) {
              if (error?.message) {
                errorText = error.message;
              }
              continue;
            }
          }

          if (matchedList.length) {
            break;
          }
        }

        setMealMap((prev) => ({
          ...prev,
          [cacheKey]: matchedList.map((item, index) =>
            normalizeMeal(item, index),
          ),
        }));

        if (!matchedList.length && errorText) {
          setMealErrorMap((prev) => ({ ...prev, [cacheKey]: errorText }));
        }
      } catch {
        setMealMap((prev) => ({ ...prev, [cacheKey]: [] }));
        setMealErrorMap((prev) => ({
          ...prev,
          [cacheKey]: "菜单加载失败，请稍后重试",
        }));
      } finally {
        setMealLoadingMap((prev) => ({ ...prev, [cacheKey]: false }));
      }
    };

    fetchMeals();
  }, [
    activeProviderId,
    activeProviderName,
    activeDateTime,
    activeMealType,
    mealMap,
  ]);

  const goBack = () => {
    Taro.navigateBack();
  };

  const handleCall = (phone) => {
    if (!phone) {
      Taro.showToast({ title: "暂无联系电话", icon: "none" });
      return;
    }

    Taro.makePhoneCall({ phoneNumber: String(phone) });
  };

  const handleLocation = (item) => {
    if (!Number.isFinite(item.latitude) || !Number.isFinite(item.longitude)) {
      Taro.showToast({ title: "暂无可用定位", icon: "none" });
      return;
    }

    Taro.openLocation({
      name: item.name,
      address: item.address,
      latitude: item.latitude,
      longitude: item.longitude,
      scale: 18,
    });
  };

  const cacheKey = `${activeProviderId}_${activeDateTime}_${activeMealType}`;
  const activeMeals = mealMap[cacheKey] || [];
  const mealsLoading = mealLoadingMap[cacheKey];
  const mealErrorText = mealErrorMap[cacheKey] || "";

  return (
    <View className="elderly-care-page">
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <ArrowLeft size={20} />
            <Text>返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">养老用餐</Text>
          <Text className="subtitle">便捷查找供餐点与每日餐单</Text>
        </View>
      </View>

      <View className="content-wrap">
        <View className="provider-list">
          {!loadingProviders && providerErrorText ? (
            <View className="empty-card">
              <Text className="empty-text">{providerErrorText}</Text>
            </View>
          ) : null}

          {!loadingProviders && !providerErrorText && !providers.length ? (
            <View className="empty-card">
              <Text className="empty-text">暂无供餐点信息</Text>
            </View>
          ) : null}

          {providers.map((provider) => (
            <View
              className={`provider-card ${activeProviderId === provider.id ? "provider-card--active" : ""}`}
              key={provider.id}
              onClick={() => setActiveProviderId(provider.id)}
            >
              <View className="provider-summary">
                <Text className="name-icon">🍲</Text>
                <Text className="name-text">{provider.name}</Text>
                <Text className="summary-tip">
                  {activeProviderId === provider.id ? "已展开" : "点击查看详情"}
                </Text>
              </View>

              <View className="provider-detail">
                <View className="provider-info-row">
                  <LocationOutlined size="16" color="#12a15a" />
                  <Text className="info-text">{provider.address}</Text>
                </View>

                <View className="provider-info-row">
                  <Phone size="16" color="#12a15a" />
                  <Text className="info-text">
                    {provider.phone || "暂无电话"}
                  </Text>
                </View>

                <View className="provider-info-row">
                  <Clock size="16" color="#12a15a" />
                  <Text className="info-text">
                    {provider.serviceTime || "服务时间待补充"}
                  </Text>
                </View>

                <View className="provider-info-row">
                  <Contact size="16" color="#12a15a" />
                  <Text className="info-text">
                    就餐方式：{provider.mealStyle || "暂无"}
                  </Text>
                </View>

                <View className="provider-info-row">
                  <Contact size="16" color="#12a15a" />
                  <Text className="info-text">
                    优惠信息：{provider.bonusInfo || "暂无"}
                  </Text>
                </View>

                <View className="provider-actions">
                  <Button
                    className="action-btn call-btn"
                    color="success"
                    shape="round"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCall(provider.phone);
                    }}
                  >
                    <Phone size={16} style={{ marginRight: 4 }} />
                    联系供餐点
                  </Button>
                  <Button
                    className="action-btn location-btn"
                    color="success"
                    variant="outlined"
                    shape="round"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLocation(provider);
                    }}
                  >
                    <LocationOutlined size={16} style={{ marginRight: 4 }} />
                    查看位置
                  </Button>
                </View>
              </View>
            </View>
          ))}
        </View>

        {activeProviderId !== null ? (
          <View className="meal-panel">
            <View className="meal-panel-header">
              <Text className="meal-panel-title">{activeDateTime} 菜单</Text>
            </View>

            <View className="meal-date-tabs">
              {DATE_OPTIONS.map((dateValue) => (
                <View
                  className={`meal-date-tab ${activeDateTime === dateValue ? "meal-date-tab--active" : ""}`}
                  key={dateValue}
                  onClick={() => setActiveDateTime(dateValue)}
                >
                  <Text>{dateValue}</Text>
                </View>
              ))}
            </View>

            <View className="meal-type-tabs">
              {MEAL_TYPES.map((mealType) => (
                <View
                  className={`meal-tab ${activeMealType === mealType.key ? "meal-tab--active" : ""}`}
                  key={mealType.key}
                  onClick={() => setActiveMealType(mealType.key)}
                >
                  <Text>{mealType.label}</Text>
                </View>
              ))}
            </View>

            <View className="meal-table-wrap">
              <View className="meal-table-head meal-table-row">
                <Text className="col-meal">餐次</Text>
                <Text className="col-dish">菜品</Text>
                <Text className="col-desc">备注</Text>
              </View>

              {mealsLoading ? (
                <Text className="meal-empty">正在加载菜单...</Text>
              ) : mealErrorText ? (
                <Text className="meal-empty">{mealErrorText}</Text>
              ) : activeMeals.length ? (
                activeMeals.map((meal) => (
                  <View
                    className="meal-table-row meal-table-body"
                    key={meal.id}
                  >
                    <Text className="col-meal">{activeMealType}</Text>
                    <Text className="col-dish">{meal.dishName}</Text>
                    <Text className="col-desc">{meal.desc || "-"}</Text>
                  </View>
                ))
              ) : (
                <Text className="meal-empty">暂无菜单数据</Text>
              )}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
