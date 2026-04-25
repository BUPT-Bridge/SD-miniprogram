export const guideHomeTitle = "您是想了解哪类补贴";

export const subsidyServices = [
  {
    id: "elderly-assist-card",
    title: "养老助残卡",
    status: "pending",
  },
  {
    id: "senior-allowance",
    title: "高龄老年人津贴",
    status: "pending",
  },
  {
    id: "home-care-bed",
    title: "养老家庭照护床位",
    status: "ready",
  },
  {
    id: "disabled-care-subsidy",
    title: "失能老年人护理补贴",
    status: "pending",
  },
  {
    id: "ability-assessment",
    title: "老年人能力评估",
    status: "pending",
  },
  {
    id: "difficult-elderly-subsidy",
    title: "困难老年人养老服务补贴",
    status: "pending",
  },
];

export const serviceGuideMap = {
  "home-care-bed": {
    id: "home-care-bed",
    title: "养老家庭照护床位",
    subtitle: "了解服务对象、补贴标准与办理流程",
    branches: [
      {
        id: "target",
        title: "服务对象",
        description: "查看哪些老人符合家庭照护床位服务条件",
      },
      {
        id: "subsidy",
        title: "补贴标准",
        description: "了解补贴额度、服务形式与政策衔接",
      },
      {
        id: "process",
        title: "办理流程指南",
        description: "按步骤了解评估、申请、审核和服务流程",
      },
    ],
    content: {
      target: {
        title: "养老家庭照护床位—服务对象",
        intro:
          "首先满足您是海淀区户籍，且在海淀区实际居家生活的老年人；第二在满足以下条件之一。",
        items: [
          "重度失能 60 周岁及以上老年人，需要经老年人能力综合评估认证。",
          "轻、中度失能 65 周岁及以上老年人，需要经老年人能力综合评估认证。",
          "年满 80 周岁及以上独居、空巢、孤寡或计划生育特殊家庭老年人，需要经老年人能力综合评估认证。",
          "持有残疾证，60 周岁及以上，残疾等级为 2 级的视力、肢体残疾老年人，或智力残疾老年人，需要经老年人能力综合评估后确定服务等级。",
          "持有残疾证，60 周岁及以上，残疾等级为 1 级的视力、肢体残疾老年人，或智力 1-2 级残疾老年人，其中视力重度失能的，不需要做老年人能力综合评估认证。",
        ],
        notice: "没有做过老年人能力综合评估认证的，需要先进行申请评估认证。",
      },
      subsidy: {
        title: "养老家庭照护床位—补贴标准",
        intro: "家庭照护床位服务补贴仅限于享受稳定的服务，不发放现金。",
        modules: [
          {
            title: "无偿服务补贴",
            items: [
              "高龄自理老人：每月补贴 300 元额度的居家养老服务。",
              "轻度失能老人：每月补贴 600 元额度的居家养老服务。",
            ],
          },
          {
            title: "有偿补贴",
            items: [
              "轻度或中度失能按照申请人实际发生服务费用的 50% 给予服务补贴，且轻度失能每月最高补贴 500 元，中度失能每月最高补贴 900 元。",
            ],
          },
          {
            title: "政策衔接",
            items: [
              "已享受重度失能护理补贴的 60 周岁及以上老人，不再享受家庭照护床位服务补贴。",
              "已享受北京市失能护理补贴 200、400 元标准的残疾老人，并在家庭照护床位机构和街道已备案的，养老家庭照护床位补贴和重度失能护理补贴不能重复享受。",
            ],
          },
        ],
        note: "注：详细情况可拨打社区电话进行详细咨询。",
      },
      process: {
        title: "养老家庭照护床位—申请流程指南",
        steps: [
          {
            title: "评估",
            description:
              "申请人自愿通过北京市民政局官网、“北京民政”微信公众号申请，自费进行能力综合评估，根据评估结果确定老人服务等级。",
          },
          {
            title: "申请及初审",
            description:
              "老人或其监护人在社区（村）服务站填写《海淀区养老家庭照护床位设立申请表》进行申请。",
          },
          {
            title: "规划",
            description:
              "老人或其监护人在社区（村）服务站填写《海淀区养老家庭照护床位设立申请表》后，进入服务规划流程。",
          },
          {
            title: "审核",
            description: "服务机构为老人制定服务规划，并签订服务协议。",
          },
          {
            title: "服务",
            description: "服务机构提供家庭养老照护床位服务。",
          },
          {
            title: "评价",
            description: "服务结束后，服务对象对当次服务进行满意度评价。",
          },
        ],
      },
    },
  },
};

export const getServiceById = (serviceId) =>
  subsidyServices.find((service) => service.id === serviceId);

export const getGuideByServiceId = (serviceId) => serviceGuideMap[serviceId];
