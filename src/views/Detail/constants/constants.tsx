import {
  AudioGuideActiveIcon,
  AudioGuideInActiveIcon,
  AuditoriumActiveIcon,
  AuditoriumInActiveIcon,
  BabySpareChairActiveIcon,
  BabySpareChairInActiveIcon,
  BigPrintActiveIcon,
  BigPrintInActiveIcon,
  BraileBlockActiveIcon,
  BraileBlockInActiveIcon,
  BrailePromotionActiveIcon,
  BrailePromotionInActiveIcon,
  ElevatorActiveIcon,
  ElevatorInActiveIcon,
  ExitActiveIcon,
  ExitInActiveIcon,
  GuideHumanActiveIcon,
  GuideHumanInActiveIcon,
  GuideSystemActiveIcon,
  GuideSystemInActiveIcon,
  HelpDogActiveIcon,
  HelpDogInActiveIcon,
  LactationRoomActiveIcon,
  LactationRoomInActiveIcon,
  ParkingActiveIcon,
  ParkingInActiveIcon,
  PromotionActiveIcon,
  PromotionInActiveIcon,
  PublicTransportActiveIcon,
  PublicTransportInActiveIcon,
  RestroomActiveIcon,
  RestroomInActiveIcon,
  RouteActiveIcon,
  RouteInActiveIcon,
  SignGuideActiveIcon,
  SignGuideInActiveIcon,
  StrollerActiveIcon,
  StrollerInActiveIcon,
  TicketOfficeActiveIcon,
  TicketOfficeInActiveIcon,
  VideoGuideActiveIcon,
  VideoGuideInActiveIcon,
  WheelChairAcitveIcon,
  WheelChairInAcitveIcon,
} from '@/assets/icon';

interface Facility {
  name: string;
  active: JSX.Element;
  inactive: JSX.Element;
}

export const PHYSICAL_FACILITIES: Facility[] = [
  {
    name: '주차장',
    active: <ParkingActiveIcon />,
    inactive: <ParkingInActiveIcon />,
  },
  {
    name: '접근로',
    active: <RouteActiveIcon />,
    inactive: <RouteInActiveIcon />,
  },
  {
    name: '대중교통',
    active: <PublicTransportActiveIcon />,
    inactive: <PublicTransportInActiveIcon />,
  },
  {
    name: '매표소',
    active: <TicketOfficeActiveIcon />,
    inactive: <TicketOfficeInActiveIcon />,
  },
  {
    name: '홍보물',
    active: <PromotionActiveIcon />,
    inactive: <PromotionInActiveIcon />,
  },
  {
    name: '휠체어',
    active: <WheelChairAcitveIcon />,
    inactive: <WheelChairInAcitveIcon />,
  },
  {
    name: '출입통로',
    active: <ExitActiveIcon />,
    inactive: <ExitInActiveIcon />,
  },
  {
    name: '엘리베이터',
    active: <ElevatorActiveIcon />,
    inactive: <ElevatorInActiveIcon />,
  },
  {
    name: '화장실',
    active: <RestroomActiveIcon />,
    inactive: <RestroomInActiveIcon />,
  },
  {
    name: '관람석',
    active: <AuditoriumActiveIcon />,
    inactive: <AuditoriumInActiveIcon />,
  },
];

export const VISUAL_FACILITIES: Facility[] = [
  {
    name: '점형/선형 블록',
    active: <BraileBlockActiveIcon />,
    inactive: <BraileBlockInActiveIcon />,
  },
  {
    name: '안내견',
    active: <HelpDogActiveIcon />,
    inactive: <HelpDogInActiveIcon />,
  },
  {
    name: '안내 요원',
    active: <GuideHumanActiveIcon />,
    inactive: <GuideHumanInActiveIcon />,
  },
  {
    name: '오디오가이드',
    active: <AudioGuideActiveIcon />,
    inactive: <AudioGuideInActiveIcon />,
  },
  {
    name: '큰 활자',
    active: <BigPrintActiveIcon />,
    inactive: <BigPrintInActiveIcon />,
  },
  {
    name: '점자 표지판',
    active: <BrailePromotionActiveIcon />,
    inactive: <BrailePromotionInActiveIcon />,
  },
  {
    name: '유도·안내',
    active: <GuideSystemActiveIcon />,
    inactive: <GuideSystemInActiveIcon />,
  },
];

export const HEARING_FACILITIES: Facility[] = [
  {
    name: '수화 안내',
    active: <SignGuideActiveIcon />,
    inactive: <SignGuideInActiveIcon />,
  },
  {
    name: '자막',
    active: <VideoGuideActiveIcon />,
    inactive: <VideoGuideInActiveIcon />,
  },
];

export const INFANT_FACILITIES: Facility[] = [
  {
    name: '유모차',
    active: <StrollerActiveIcon />,
    inactive: <StrollerInActiveIcon />,
  },
  {
    name: '수유실',
    active: <LactationRoomActiveIcon />,
    inactive: <LactationRoomInActiveIcon />,
  },
  {
    name: '유아용 의자',
    active: <BabySpareChairActiveIcon />,
    inactive: <BabySpareChairInActiveIcon />,
  },
];
