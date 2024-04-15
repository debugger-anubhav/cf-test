// home page
import {
  HomePageImages,
  HomePageMediaCoverage,
  HomePageFourSteps,
  hasselFreeSection,
} from "@/assets/images";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

export const CityToStateMapping = {
  Delhi: "Delhi",
  Mumbai: "Maharashtra",
  Bangalore: "Karnataka",
  Pune: "Maharashtra",
  Gurgaon: "Haryana",
  "Ghaziabad/Noida": "Uttar Pradesh",
  Hyderabad: "Telangana",
};

export const keyPressForContactField = event => {
  // Prevent 'e' and '-' characters
  if (event.key === "e" || event.key === "-") {
    event.preventDefault();
  }
};

export const handleKeyDown = event => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
};

export const handleWheel = event => {
  event.target.blur();
};

export const RentFurniture = [
  {
    img: HomePageImages.bedroom,
    label: "Bedroom",
    desc: "Beds, bedside tables, mattresses, storage, wardrobes, pillows and more",
  },
  {
    img: HomePageImages.studyroom,
    label: "Study room",
    desc: "Refrigerator, Water purifier, Air conditioners, washing machine, Television and more",
  },
  {
    img: HomePageImages.livingroom,
    label: "Living room",
    desc: "Workstations, Office tables, Ergonomic office chairs and more",
  },
  {
    img: HomePageImages.appliances,
    label: "Appliances",
    desc: "Refrigerator, Water purifier, Air conditioners, washing machine, Television and more",
  },
  {
    img: HomePageImages.office,
    label: "Office",
    desc: "Workstations, Office tables, Ergonomic office chairs and more",
  },
  {
    img: HomePageImages.diningroom,
    label: "Dining room",
    desc: "4 seater dining set, 6 seater dining set, Dining table, Dining chair, 2 seater dining set and more",
  },
];
export const MediaCoverageImages = [
  {img: HomePageMediaCoverage.icon1, alt: "business-line-"},
  {img: HomePageMediaCoverage.icon2, alt: "ani-"},
  {img: HomePageMediaCoverage.icon3, alt: "business-standard-"},
  {img: HomePageMediaCoverage.icon4, alt: "entrackr-"},
  {img: HomePageMediaCoverage.icon5, alt: "entrepreneur-india-"},
  {img: HomePageMediaCoverage.icon6, alt: "inc42-"},
  {img: HomePageMediaCoverage.icon7, alt: "khaleej-times-"},
  {img: HomePageMediaCoverage.icon8, alt: "theprint-"},
  {img: HomePageMediaCoverage.icon9, alt: "outlook-"},
];

export const CustomerRatingsCard = [
  {
    img: "",
    name: "Steven Chen",
    rating: 5,
    content:
      "Great delivery experience. Mr. Dilip Maurya servicing my delivery order was very polite and co-ordinated very well for delivery even when i was not at home at the time of call and took a few minutes to reach. Assembly was quick and without noise or hassles.",
  },
  {
    img: "",
    name: "Steven Chen",
    rating: 5,
    content:
      "Great delivery experience. Mr. Dilip Maurya servicing my delivery order was very polite and co-ordinated very well for delivery even when i was not at home at the time of call and took a few minutes to reach. Assembly was quick and without noise or hassles.",
  },
  {
    img: "",
    name: "Steven Chen",
    rating: 5,
    content:
      "Great delivery experience. Mr. Dilip Maurya servicing my delivery order was very polite and co-ordinated very well for delivery even when i was not at home at the time of call and took a few minutes to reach. Assembly was quick and without noise or hassles.",
  },
  {
    img: "",
    name: "Steven Chen",
    rating: 5,
    content:
      "Great delivery experience. Mr. Dilip Maurya servicing my delivery order was very polite and co-ordinated very well for delivery even when i was not at home at the time of call and took a few minutes to reach. Assembly was quick and without noise or hassles.",
  },
  {
    img: "",
    name: "Steven Chen",
    rating: 5,
    content:
      "Great delivery experience. Mr. Dilip Maurya servicing my delivery order was very polite and co-ordinated very well for delivery even when i was not at home at the time of call and took a few minutes to reach. Assembly was quick and without noise or hassles.",
  },
  {
    img: "",
    name: "Steven Chen",
    rating: 5,
    content:
      "Great delivery experience. Mr. Dilip Maurya servicing my delivery order was very polite and co-ordinated very well for delivery even when i was not at home at the time of call and took a few minutes to reach. Assembly was quick and without noise or hassles.",
  },
  {
    img: "",
    name: "Steven Chen",
    rating: 5,
    content:
      "Great delivery experience. Mr. Dilip Maurya servicing my delivery order was very polite and co-ordinated very well for delivery even when i was not at home at the time of call and took a few minutes to reach. Assembly was quick and without noise or hassles.",
  },
];

export const FourStepsCardData = [
  {
    head: "STEP 1",
    content: "Select a product & tenure to start renting",
    img1: HomePageFourSteps.card1,
    img2: HomePageFourSteps.cardMob1,
  },
  {
    head: "STEP 2",
    content: "Pay the amount & do KYC",
    img1: HomePageFourSteps.card2,
    img2: HomePageFourSteps.cardMob2,
  },
  {
    head: "STEP 3",
    content: `Get items delivered
    & assembled
    within 72 hrs`,
    img1: HomePageFourSteps.card3,
    img2: HomePageFourSteps.cardMob3,
  },
  {
    head: "STEP 4",
    content: "Experience the firsthand magic of furniture",
    img1: HomePageFourSteps.card4,
    img2: HomePageFourSteps.cardMob4,
  },
];

export const HappySubscriber = [
  {
    thumbnailImg: "",
    file_name:
      "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP",
    title: "Name | Profession",
    description:
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
  },
  {
    thumbnailImg: "",
    file_name: "",
    title: "Name | Profession",
    description:
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
  },
  {
    thumbnailImg: "",
    file_name: "",
    title: "Name | Profession",
    description:
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
  },
  {
    thumbnailImg: "",
    file_name: "",
    title: "Name | Profession",
    description:
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
  },
  {
    thumbnailImg: "",
    file_name: "",
    title: "Name | Profession",
    description:
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
  },
  {
    thumbnailImg: "",
    file_name: "",
    title: "Name | Profession",
    description:
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
  },
  {
    thumbnailImg: "",
    file_name: "",
    title: "Name | Profession",
    description:
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
  },
];

export const HasselFreeData = [
  {
    icon: hasselFreeSection.IconOne,
    backgroungImage: hasselFreeSection.FrameOne,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/mint-new-products.webp",
    Heading: "Mint new products",
    text: "Assured products. You'll be renting furniture that looks & feels brand new",
  },
  {
    icon: hasselFreeSection.IconTwo,
    backgroungImage: hasselFreeSection.FrameTwo,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/free-shipping.webp",
    Heading: "Free shipping",
    text: "Get your furniture delivered to your doorstep with no extra shipping cost",
  },
  {
    icon: hasselFreeSection.IconFour,
    backgroungImage: hasselFreeSection.FrameThree,

    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/free-installation.webp",
    Heading: "Free installation",
    text: "No need to pay for furniture assembly. We will install your furniture for free",
  },
  {
    icon: hasselFreeSection.IconSix,
    backgroungImage: hasselFreeSection.FrameFour,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/free-relocation.webp",
    Heading: "Free relocation",
    text: "Planning to relocate? We’ll help you relocate your furniture for free",
  },
  {
    icon: hasselFreeSection.IconFive,
    backgroungImage: hasselFreeSection.FrameFive,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/insurance-cover.webp",
    Heading: "Insurance cover",
    text: "Minor damages or scratches to the rent products will be waived off",
  },
  {
    icon: hasselFreeSection.IconThree,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/flexible-upgrades.webp",

    Heading: "Flexible upgrades",
    text: "Upgrade your house with new products after 6 months of use for free",
    backgroungImage: hasselFreeSection.FrameSix,
  },
];

export const HasselFreeDataForProductPage = [
  {
    icon: hasselFreeSection.IconTwo,
    Heading: "Free shipping",
    text: "Get your furniture delivered to your doorstep with no extra shipping cost",
  },
  {
    icon: hasselFreeSection.IconFour,
    Heading: "Free installation",
    text: "No need to pay for furniture assembly. We will install your furniture for free",
  },
  {
    icon: hasselFreeSection.IconOne,
    Heading: "Mint new products",
    text: "Assured products. You'll be renting furniture that looks & feels brand new",
  },
  {
    icon: hasselFreeSection.IconSix,
    Heading: "Free relocation",
    text: "Planning to relocate? We’ll help you relocate your furniture for free",
  },

  {
    icon: hasselFreeSection.IconThree,
    Heading: "Flexible upgrades",
    text: "Upgrade your house with new products after 6 months of use for free",
  },

  {
    icon: hasselFreeSection.IconFive,
    Heading: "Insurance cover",
    text: "Minor damages or scratches to the rent products will be waived off",
  },
];
export const CategoryFilterData = [
  {item: "Queen Size Bed"},
  {item: "Single Bed"},
  {item: "Storage Bed"},
  {item: "King Size Bed"},
  {item: "Bedside And Storage"},
  {item: "Mattress"},
  {item: "Bedsheet And Pillow"},
  {item: "Bedsheet And Pillow"},
];
export const sortByText = [
  {text: "Default"},
  {text: "New"},
  {text: "Price: Low to High"},
  {text: "Price: High to low"},
];

export const productItemsIncludedDetails = [
  {
    img: "",
    name: "storage 1",
    brand: "placeholder",
    color: "red",
    material: "placeholder",
    size: "12 inches x 12 inches x 12 inches",
    features: [
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
    ],
  },
  {
    img: "",
    name: "storage 2",
    brand: "placeholder",
    color: "red",
    material: "placeholder",
    size: "12 inches x 12 inches x 12 inches",
    features: [
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
    ],
  },
  {
    img: "",
    name: "storage 3",
    brand: "placeholder",
    color: "red",
    material: "placeholder",
    size: "12 inches x 12 inches x 12 inches",
    features: [
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
    ],
  },
  {
    img: "",
    name: "storage 4",
    brand: "placeholder",
    color: "red",
    material: "placeholder",
    size: "12 inches x 12 inches x 12 inches",
    features: [
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
    ],
  },
  {
    img: "",
    name: "storage 5",
    brand: "placeholder",
    color: "red",
    material: "placeholder",
    size: "12 inches x 12 inches x 12 inches",
    features: [
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
      "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder ",
    ],
  },
];

export const ProductRatings = [
  {
    name: "Steven Chen",
    rating: 4,
    content:
      "Great product. Really feels comfortable. Thanks for the no hassle delivery. Material and quality is also very good",
    date: "4 July 2023",
  },
  {
    name: "Steven Chen",
    rating: 4.5,
    content:
      "Great product. Really feels comfortable. Thanks for the no hassle delivery. Material and quality is also very good",
    date: "4 July 2023",
  },
  {
    name: "Steven Chen",
    rating: 3,
    content:
      "Great product. Really feels comfortable. Thanks for the no hassle delivery. Material and quality is also very good",
    date: "4 July 2023",
  },
  {
    name: "Steven Chen",
    rating: 5,
    content:
      "Great product. Really feels comfortable. Thanks for the no hassle delivery. Material and quality is also very good",
    date: "4 July 2023",
  },
  {
    name: "Steven Chen",
    rating: 4,
    content:
      "Great product. Really feels comfortable. Thanks for the no hassle delivery. Material and quality is also very good",
    date: "4 July 2023",
  },
  {
    name: "Steven Chen",
    rating: 5,
    content:
      "Great product. Really feels comfortable. Thanks for the no hassle delivery. Material and quality is also very good",
    date: "4 July 2023",
  },
  {
    name: "Steven Chen",
    rating: 5,
    content:
      "Great product. Really feels comfortable. Thanks for the no hassle delivery. Material and quality is also very good",
    date: "4 July 2023",
  },
];

export const FooterItems = [
  {
    Footer: {
      why_furni: "Furniture Rental: An Affordable and Flexible Option",
      why_furni_desc:
        "Are you looking for a cost-effective and flexible way to furnish your home or office? Furniture rental may be the solution you've been searching for. CityFurnish, a leading furniture rental company, offers a wide range of home and office furniture for rent online, through their user-friendly furniture rental app.",
      array: [
        {
          head: "Categories",
          points: [
            {text: "All", link: "/rent"},
            {text: "Categories", link: `/home-furniture-rental`},
            {text: "Home Furniture", link: "/"},
            {text: "Appliances", link: "/"},
            {text: "Workstations", link: "/"},
            {text: "Combos", link: "/"},
            {text: "Furniture Sale", link: "/"},
          ],
        },
        {
          head: "Cityfurnish",
          points: [
            {
              text: "About US",
              link: "/pages/about",
            },
            {
              text: "Refer a Friend",
              link: "/referral",
            },
            {
              text: "Career",
              link: "/pages/careers",
            },
            {
              text: "Contact US",
              link: "/pages/contact-us",
            },
          ],
        },

        {
          head: "Information",
          points: [
            {text: "Blog", link: "https://cityfurnish.com/blog/"},
            {text: "FAQ", link: "/pages/faq"},
            {
              text: "Sample Rental Agreement",
              link: "/pages/rentalagreement",
            },
            {
              text: "Offers",
              link: "/pages/offers",
            },
          ],
        },

        {
          head: "Resources",
          points: [
            {
              text: "Privacy Policy",
              link: "/pages/privacy-policy",
            },
            {
              text: "Terms & Conditions",
              link: "/pages/terms-of-use",
            },
          ],
        },
      ],
      contact: "080-66084700",
      time: "(09AM to 09PM)",
      go_to_top: "Go to top",
    },
  },
];

export const productImageBaseUrl =
  "https://d3juy0zp6vqec8.cloudfront.net/images/product/";

export const productPageImagesBaseUrl =
  "https://d3juy0zp6vqec8.cloudfront.net/images/product/";

export const categoryImageBaseUrl =
  "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/";

// const cartegoryIconsUrl =
//   "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/";
export const categoryIconsUrl =
  "https://d3juy0zp6vqec8.cloudfront.net/images/icons/";

export function setLocalStorage(key, value) {
  const data = JSON.stringify(value);
  if (typeof window !== "undefined") {
    return window?.localStorage?.setItem(key, data);
  } else {
    return {key, value};
  }
}
export function getLocalStorage(key) {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data === "undefined" ? null : JSON.parse(data);
  }
}
export function getLocalStorageString(key, value) {
  if (typeof window !== "undefined") {
    return window?.localStorage?.getItem(key);
  } else {
    return {key, value};
  }
}

// export function razorPayIntegration(handler, object){
// }

export function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const BenefitPageData = [
  {
    icon: hasselFreeSection.IconThree,
    backgroungImage: hasselFreeSection.FrameThree,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/free-installation.webp",
    Heading: "Free installation",
    text: "No need to pay for furniture assembly. We will install your furniture for free",
    updatedMobileIcon:
      "https://d3juy0zp6vqec8.cloudfront.net/images/icons/free-installation-icon.svg",
  },
  {
    icon: hasselFreeSection.IconTwo,
    backgroungImage: hasselFreeSection.FrameTwo,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/free-shipping.webp",
    Heading: "Free shipping",
    text: "Get your furniture delivered to your doorstep with no extra shipping cost",
    updatedMobileIcon:
      "https://d3juy0zp6vqec8.cloudfront.net/images/icons/free-shipping-icon.svg",
  },
  {
    icon: hasselFreeSection.IconOne,
    backgroungImage: hasselFreeSection.FrameOne,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/mint-new-products.webp",
    Heading: "Mint new products",
    text: "Assured products. You'll be renting furniture that looks & feels brand new",
    updatedMobileIcon:
      "https://d3juy0zp6vqec8.cloudfront.net/images/icons/mint-new-products-icon.svg",
  },

  {
    icon: hasselFreeSection.IconFour,
    backgroungImage: hasselFreeSection.FrameFour,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/free-relocation.webp",
    Heading: "Free relocation",
    text: "Planning to relocate? We’ll help you relocate your furniture for free",
    updatedMobileIcon:
      "https://d3juy0zp6vqec8.cloudfront.net/images/icons/free-relocation-icon.svg",
  },
  {
    icon: hasselFreeSection.IconFive,
    backgroungImage: hasselFreeSection.FrameFive,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/insurance-cover.webp",
    Heading: "Insurance cover",
    text: "Minor damages or scratches to the rent products will be waived off",
    updatedMobileIcon:
      "https://d3juy0zp6vqec8.cloudfront.net/images/icons/insurance-cover-icon.svg",
  },
  {
    icon: hasselFreeSection.IconSix,
    backgroungImage: hasselFreeSection.FrameSix,
    bgImgMobile:
      "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/flexible-upgrades.webp",
    Heading: "Flexible upgrades",
    text: "Upgrade your house with new products after 6 months of use for free",
    updatedMobileIcon:
      "https://d3juy0zp6vqec8.cloudfront.net/images/icons/flexible-upgrades-icon.svg",
  },
];

// for service request
const userId = decrypt(getLocalStorage("_ga"));
const tempUserId = decryptBase64(getLocalStorage("tempUserID"));
const userIdToUse = userId || tempUserId;
export const CreateRequestPayload = {
  user_id: userIdToUse,
  deal_id: "",
  description: "",
  repair_details: "",
  Pickup_Request_Type: "",
  pickup_reason: "",
  Possible_Values: "",
  cancel_order_reason: "",
  type: "",
  pickup_request_date: "",
  requested_date: "",
  selected_product_name: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postal_code: "",
  phone_alternate: "",
  upgrade_product: "",
  full_name: "",
  mobile_number: "",
  email: "",
  repair_reason: "",
  billCycleDay: "",
};

export const CreateRequest = CreateRequestPayload => {
  baseInstance
    .post(endPoints.serviceRequestPage.createRequest, CreateRequestPayload)
    .then(res => {
      showToastNotification(
        res?.data?.data?.msg,
        res?.data?.data?.status === true ? 2 : 3,
      );
    })
    .catch(err => console.log(err?.message || "some error"));
};
