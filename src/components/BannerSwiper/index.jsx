import { Component } from "react";
import { View } from "@tarojs/components";
import Swiper from "@taroify/core/swiper";
import Image from "@taroify/core/image";
import "@taroify/core/swiper/style";
import "@taroify/core/image/style";
import "./index.scss";

/**
 * 轮播图组件
 * @param {Array} images - 图片数组，格式: [{ url: '图片链接', alt: '描述' }]
 * @param {number} autoplay - 自动轮播间隔，单位 ms，不传则不自动播放
 * @param {number} height - 轮播图高度，单位 px
 */
export default class BannerSwiper extends Component {
  static defaultProps = {
    images: [],
    autoplay: 3000,
    height: 380,
  };

  state = {
    current: 0,
  };

  onChange = (index) => {
    this.setState({ current: index });
    this.props.onChange?.(index);
  };

  render() {
    const { images, autoplay, height } = this.props;
    const { current } = this.state;

    if (!images || images.length === 0) {
      return null;
    }

    return (
      <View className="banner-swiper-wrapper">
        <Swiper
          className="banner-swiper"
          autoplay={autoplay}
          height={height}
          onChange={this.onChange}
        >
          {images.map((image, index) => (
            <Swiper.Item key={index}>
              <Image
                className="banner-image"
                src={image.url}
                mode="aspectFill"
              />
            </Swiper.Item>
          ))}
        </Swiper>

        {/* 指示器 */}
        <View className="banner-indicator">
          {images.map((_, index) => (
            <View
              key={index}
              className={`indicator-dot ${current === index ? "active" : ""}`}
            />
          ))}
        </View>
      </View>
    );
  }
}
