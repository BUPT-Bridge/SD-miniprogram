import { useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
  getHealthGuideTypes,
  getHealthGuideContentsWithFileUrl,
  buildHealthGuideFileUrl,
} from "../api/healthGuidance";
import "./index.scss";

export default function HealthGuidance() {
  const [loading, setLoading] = useState(false);
  const [fileTree, setFileTree] = useState([]);
  const [errorText, setErrorText] = useState("");

  const hasData = useMemo(() => {
    return fileTree.length > 0;
  }, [fileTree]);

  useEffect(() => {
    const fetchHealthGuidanceData = async () => {
      setLoading(true);
      setErrorText("");
      try {
        const typesRes = await getHealthGuideTypes();
        const types =
          typesRes.healthGuideTypes || typesRes.health_guide_types || [];
        console.log("[HealthGuidance] getHealthGuideTypes:", types);

        const pairs = types.flatMap((item) => {
          const typeOne = item.typeOne ?? item.id ?? 0;
          const typeName = item.typeName ?? item.type_name ?? "未分类";
          const options = item.typeTwoOptions || [];
          if (!options.length) {
            const fallbackTypeTwo = item.typeTwo ?? item.type_two ?? "";
            return fallbackTypeTwo
              ? [
                  {
                    type_one: typeOne,
                    type_two: fallbackTypeTwo,
                    type_name: typeName,
                  },
                ]
              : [];
          }
          return options.map((typeTwo) => ({
            type_one: typeOne,
            type_two: typeTwo,
            type_name: typeName,
          }));
        });
        console.log("[HealthGuidance] 目录层级:", pairs);

        const pairResults = await Promise.all(
          pairs.map(async (pair) => {
            try {
              const contents = await getHealthGuideContentsWithFileUrl(
                pair.type_one,
                pair.type_two,
              );
              return contents.map((item) => ({
                ...item,
                type_one: pair.type_one,
                type_two: pair.type_two,
                type_name: pair.type_name,
              }));
            } catch (error) {
              console.error("[HealthGuidance] 内容获取失败:", pair, error);
              return [];
            }
          }),
        );

        const allContents = pairResults.flat();
        console.log("[HealthGuidance] 全量内容:", allContents);

        const normalizedFiles = allContents
          .map((item) => {
            const content = item.contentParsed || {};
            const fileType = String(content.file_type || "")
              .toLowerCase()
              .trim();
            const uuid = item.fileUuid || content.uuid || content.index || "";
            const title =
              content.title || `${item.type_two || "健康指导"}内容文件`;
            const fileUrl = item.fileUrl || buildHealthGuideFileUrl(uuid);
            return {
              id: item.id || `${item.type_one}-${item.type_two}-${uuid}`,
              typeOne: item.type_one || item.typeOne || 0,
              typeName: item.type_name || item.typeName || "未分类",
              typeTwo: item.type_two || item.typeTwo || "",
              title,
              description: content.description || item.description || "",
              uuid,
              fileType,
              fileUrl,
            };
          })
          .filter((item) => item.uuid && item.fileType);

        const buildFileTree = (files) => {
          const groupedMap = new Map();
          files.forEach((item) => {
            const levelOneKey = `${item.typeOne}::${item.typeName || "未分类"}`;
            const levelTwoKey = item.typeTwo || "未分类";
            if (!groupedMap.has(levelOneKey)) {
              groupedMap.set(levelOneKey, {
                typeOne: item.typeOne,
                typeName: item.typeName || "未分类",
                childrenMap: new Map(),
              });
            }
            const levelTwoMap = groupedMap.get(levelOneKey).childrenMap;
            if (!levelTwoMap.has(levelTwoKey)) {
              levelTwoMap.set(levelTwoKey, []);
            }
            levelTwoMap.get(levelTwoKey).push(item);
          });
          return Array.from(groupedMap.values()).map((levelOne) => ({
            typeOne: levelOne.typeOne,
            typeName: levelOne.typeName,
            children: Array.from(levelOne.childrenMap.entries()).map(
              ([typeTwo, list]) => ({
                typeTwo,
                files: list,
              }),
            ),
          }));
        };

        const mergedFiles = normalizedFiles
          .filter(
            (item) => item.fileType === "video" || item.fileType === "pdf",
          )
          .sort((left, right) => {
            const typeOneCompare = String(left.typeOne).localeCompare(
              String(right.typeOne),
              "zh-Hans-CN",
              {
                numeric: true,
              },
            );
            if (typeOneCompare !== 0) {
              return typeOneCompare;
            }
            const typeTwoCompare = String(left.typeTwo).localeCompare(
              String(right.typeTwo),
              "zh-Hans-CN",
            );
            if (typeTwoCompare !== 0) {
              return typeTwoCompare;
            }
            return String(left.title).localeCompare(
              String(right.title),
              "zh-Hans-CN",
            );
          });
        const nextFileTree = buildFileTree(mergedFiles);

        setFileTree(nextFileTree);

        console.log("[HealthGuidance] 合并文件目录:", nextFileTree);
      } catch (error) {
        console.error("[HealthGuidance] API 调用失败:", error);
        setErrorText("健康指导内容获取失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthGuidanceData();
  }, []);

  const goBack = () => {
    Taro.navigateBack();
  };

  const handlePreviewFile = (item) => {
    Taro.navigateTo({
      url: `/HealthGuidance/preview/index?uuid=${encodeURIComponent(item.uuid)}&title=${encodeURIComponent(item.title)}&fileType=${encodeURIComponent(item.fileType)}`,
    });
  };

  return (
    <View className="health-guidance-page">
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <Text>&lt; 返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">健康指导</Text>
          <Text className="subtitle">了解最新的健康指导内容</Text>
        </View>
      </View>

      <View className="content-panel">
        <View className="section-card">
          <Text className="section-title">内容预览区</Text>
          {fileTree.length ? (
            fileTree.map((levelOne) => (
              <View
                className="pdf-level-one"
                key={`${levelOne.typeOne}-${levelOne.typeName}`}
              >
                <Text className="pdf-level-one-title">
                  {levelOne.typeName || "未分类"}
                </Text>
                {levelOne.children.map((levelTwo) => (
                  <View
                    className="pdf-level-two"
                    key={`${levelOne.typeOne}-${levelTwo.typeTwo}`}
                  >
                    <Text className="pdf-level-two-title">
                      {levelTwo.typeTwo}
                    </Text>
                    {levelTwo.files.map((item) => (
                      <View
                        className={`pdf-item pdf-item--${item.fileType}`}
                        key={item.id}
                        onClick={() => handlePreviewFile(item)}
                      >
                        <View className="item-title-wrap">
                          <Text className="item-title">{item.title}</Text>
                          <Text className="item-file-icon"></Text>
                        </View>
                        <Text className="item-action">
                          {item.fileType === "video" ? "点击播放" : "点击预览"}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text className="empty-text">
              {loading ? "正在加载内容..." : "暂无可预览内容"}
            </Text>
          )}
        </View>

        {!loading && !hasData && errorText ? (
          <Text className="error-text">{errorText}</Text>
        ) : null}
      </View>
    </View>
  );
}
