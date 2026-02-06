import request from "./request";
import proto from "./proto/feedback.js";

export const submitFeedback = async (data) => {
  const FeedbackRequest = proto.feedback_api.FeedbackRequest;
  const FeedbackResponse = proto.feedback_api.FeedbackResponse;

  const errMsg = FeedbackRequest.verify(data);
  if (errMsg) {
    throw Error(errMsg);
  }

  const message = FeedbackRequest.create(data);
  const buffer = FeedbackRequest.encode(message).finish();

  // 微信小程序的通信数据不支持 Uint8Array，需转成 ArrayBuffer
  const arrayBuffer = Uint8Array.from(buffer).buffer;

  const response = await request({
    url: "/api/feedback",
    method: "POST",
    header: {
      "Content-Type": "application/octet-stream",
    },
    data: arrayBuffer,
    responseType: "arraybuffer",
  });

  const responseMessage = FeedbackResponse.decode(
    new Uint8Array(response.data),
  );
  return FeedbackResponse.toObject(responseMessage);
};
