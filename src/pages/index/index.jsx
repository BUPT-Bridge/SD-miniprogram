import { ScrollView, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getSlideShowList } from "../../api/bannerSwiper";
import { getLatestNotice } from "../../api/warmTip";
import WarmTip from "../../components/WarmTip";
import BannerSwiper from "../../components/BannerSwiper";
import ServiceGrid from "../../components/ServiceGrid";
import "./index.scss";

export default function Index() {
  const [bannerImages, setBannerImages] = useState([]);
  const [noticeText, setNoticeText] = useState("");

  useLoad(() => {
    console.log("Page loaded.");
  });

  useEffect(() => {
    const baseUrl = (process.env.TARO_APP_API || "").replace(/\/+$/, "");

    getSlideShowList()
      .then((res) => {
        const slides = Array.isArray(res?.slideshows) ? res.slideshows : [];
        const images = slides
          .filter((item) => item?.index)
          .map((item) => ({
            url: `${baseUrl}/api/mutil_media/download?uuid=${encodeURIComponent(item.index)}`,
            alt: `杞挱鍥?{index + 1}`,
          }));
        setBannerImages(images);
      })
      .catch(() => {
        setBannerImages([]);
      });

    getLatestNotice()
      .then((res) => {
        setNoticeText(res?.notice?.content || "");
      })
      .catch(() => {
        setNoticeText("");
      });
  }, []);

  return (
    <ScrollView className="index" scrollY showScrollbar={false}>
      <View className="index__content">
        <BannerSwiper
          images={bannerImages}
          autoplay={3000}
          height={150}
          //onChange={(index) => console.log("褰撳墠杞挱绱㈠紩:", index)}
        />
        <WarmTip text={noticeText} />
        <ServiceGrid />
      </View>
    </ScrollView>
  );
}
