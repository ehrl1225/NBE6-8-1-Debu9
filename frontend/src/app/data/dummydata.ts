import { Product } from "../../lib/type/product";
import { CartItem } from "../../lib/type/cartItem";

export const dummyProducts : Product[]=[
      {
    id: 1,
    name: "스타버구 블렌드1",
    engName: "Starbu9 Blend1",
    price: 20000,
    imageUrl: "/images/starbu9_blend1.png",
    description: "파푸아 뉴 기니 하일랜즈는 미디엄 로스팅 되어 다크 로스팅 된 아시아/태평양 지역의 커피보다 더 달콤한 풍미를 강조했습니다. 이 커피는 섬의 서부 고원에서 자라며, 풍부한 화산 토양 사이에서 재배됩니다. 온화한 기후와 떼루아가 컵의 완성도를 높여줍니다. 수확된 체리는 종종 통과하기 어려운 도로를 통해 거리의 울퉁불퉁한 산으로부터 가공을 위해 운반됩니다. 이러한 노력으로 만들어진 커피는 우아하면서도 다채로운 풍미를 가지게 됩니다.  이 커피는 아시아/태평양에서 많이 사용하는 방식인 Wet-hulled 방식이 아닌 수세식으로 가공되었습니다. 그로 인해 다크 로스팅 된 아시아/태평양 커피에 비해 부드럽고 달콤한 풍미를 가지고 있습니다. 하지만 아시아/태평양 커피에서 느낄 수 있는 다채로운 허브의 풍미는 잃지 않았습니다. 묵직한 바디감은 부드럽고 사탕수수와 같은 달콤함으로 변해 더욱 매력적인 커피로 탄생하였습니다. 부드럽고 달콤한 풍미로 다양한 디저트류와 함께 페어링 하면 더욱 맛있는 커피를 즐길 수 있습니다",
  },
  {
    id: 2,
    name: "스타버구 블렌드2",
    engName: "Starbu9 Blend2",
    price: 20000,
    imageUrl: "/images/starbu9_blend2.png",
    description: "밝고 산뜻한 풍미의 블렌드",
  },
  {
    id: 3,
    name: "스타버구 블렌드3",
    engName: "Starbu9 Blend3",
    price: 20000,
    imageUrl: "/images/starbu9_blend3.png",
    description: "어쩌구 저쩌구",
  },
  {
    id: 4,
    name: "스타버구 블렌드4",
    engName: "Starbu9 Blend4",
    price: 20000,
    imageUrl: "/images/starbu9_blend4.png",
    description: "저쩌구 어쩌구",
  },
];

export const dummyCartItems : CartItem[]=[
  {
    product:{
    id: 2,
    name: "스타버구 블렌드2",
    engName: "Starbu9 Blend2",
    price: 20000,
    imageUrl: "/images/starbu9_blend2.png",
    description: "저쩌구 어쩌구",
  },
  quantity:2},
  
  {
    product:{
    id: 1,
    name: "스타버구 블렌드1",
    engName: "Starbu9 Blend1",
    price: 20000,
    imageUrl: "/images/starbu9_blend1.png",
    description: "저쩌구 어쩌구",
  },
  quantity:2},
];