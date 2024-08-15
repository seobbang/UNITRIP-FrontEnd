import {
  AudioGuideDefaultIcon,
  AudioGuideNoneIcon,
  BabyCarriageDefaultIcon,
  BabyCarriageNoneIcon,
  BigPrintingDefaultIcon,
  BigPrintingNoneIcon,
  BrailleBlocksDefaultIcon,
  BrailleBlocksNoneIcon,
  BrailleInfoIDefaultcon,
  BrailleInfoNoneIcon,
  DisabledParkingDefaultIcon,
  DisabledParkingNoneIcon,
  ElevatorDefaultIcon,
  ElevatorNoneIcon,
  EntranceDefaultIcon,
  EntranceNoneIcon,
  GuideDefaultIcon,
  GuideDogDefaultIcon,
  GuideDogNoneIcon,
  GuideForBlindDefaultIcon,
  GuideForBlindNoneIcon,
  GuideNoneIcon,
  GuideSystemDefaultIcon,
  GuideSystemNoneIcon,
  InformationDefaultIcon,
  InformationNoneIcon,
  NursingRoomDefaultIcon,
  NursingRoomNoneIcon,
  ParkingDefaultIcon,
  ParkingNoneIcon,
  PublicTransportDefaultIcon,
  PublicTransportNoneIcon,
  SeatsDefaultIcon,
  SeatsForBabyDefaultIcon,
  SeatsForBabyNoneIcon,
  SeatsNoneIcon,
  SignLanguageDefaultIcon,
  SignLanguageNoneIcon,
  SlopeDefaultIcon,
  SlopeNoneIcon,
  TicketOfficeDefaultIcon,
  TicketOfficeNoneIcon,
  ToiletDefaultIcon,
  ToiletNoneIcon,
  VideoGuideSubtitleDefaultIcon,
  VideoGuideSubtitleNoneIcon,
  WheelchairTicketOfficeDefaultIcon,
  WheelchairTicketOfficeNoneIcon,
} from '@/assets/icon';

interface Facility {
  name: string;
  default: JSX.Element;
  none: JSX.Element;
}

export const BASIC_FACILITIES: Facility[] = [
  {
    name: '안내데스크',
    default: <InformationDefaultIcon />,
    none: <InformationNoneIcon />,
  },
  {
    name: '안내 요원',
    default: <GuideDefaultIcon />,
    none: <GuideNoneIcon />,
  },
  {
    name: '매표소',
    default: <TicketOfficeDefaultIcon />,
    none: <TicketOfficeNoneIcon />,
  },
  {
    name: '화장실',
    default: <ToiletDefaultIcon />,
    none: <ToiletNoneIcon />,
  },
  {
    name: '주차장',
    default: <ParkingDefaultIcon />,
    none: <ParkingNoneIcon />,
  },
  {
    name: '경사로',
    default: <SlopeDefaultIcon />,
    none: <SlopeNoneIcon />,
  },
  {
    name: '엘리베이터',
    default: <ElevatorDefaultIcon />,
    none: <ElevatorNoneIcon />,
  },
];

export const PHYSICAL_FACILITIES: Facility[] = [
  {
    name: '휠체어 매표소',
    default: <WheelchairTicketOfficeDefaultIcon />,
    none: <WheelchairTicketOfficeNoneIcon />,
  },
  {
    name: '장애인 주차장',
    default: <DisabledParkingDefaultIcon />,
    none: <DisabledParkingNoneIcon />,
  },
];

export const VISUAL_FACILITIES: Facility[] = [
  {
    name: '점형/선형 블록',
    default: <BrailleBlocksDefaultIcon />,
    none: <BrailleBlocksNoneIcon />,
  },
  {
    name: '보조견 동반',
    default: <GuideDogDefaultIcon />,
    none: <GuideDogNoneIcon />,
  },
  {
    name: '안내요원',
    default: <GuideForBlindDefaultIcon />,
    none: <GuideForBlindNoneIcon />,
  },
  {
    name: '오디오 가이드',
    default: <AudioGuideDefaultIcon />,
    none: <AudioGuideNoneIcon />,
  },
  {
    name: '큰 활자',
    default: <BigPrintingDefaultIcon />,
    none: <BigPrintingNoneIcon />,
  },
  {
    name: '점자 안내',
    default: <BrailleInfoIDefaultcon />,
    none: <BrailleInfoNoneIcon />,
  },
  {
    name: '유도 안내 설비',
    default: <GuideSystemDefaultIcon />,
    none: <GuideSystemNoneIcon />,
  },
];

export const HEARING_FACILITIES: Facility[] = [
  {
    name: '수어 안내',
    default: <SignLanguageDefaultIcon />,
    none: <SignLanguageNoneIcon />,
  },
  {
    name: '자막',
    default: <VideoGuideSubtitleDefaultIcon />,
    none: <VideoGuideSubtitleNoneIcon />,
  },
];

export const INFANT_FACILITIES: Facility[] = [
  {
    name: '유모차',
    default: <BabyCarriageDefaultIcon />,
    none: <BabyCarriageNoneIcon />,
  },
  {
    name: '수유실',
    default: <NursingRoomDefaultIcon />,
    none: <NursingRoomNoneIcon />,
  },
  {
    name: '유아용 보조의자',
    default: <SeatsForBabyDefaultIcon />,
    none: <SeatsForBabyNoneIcon />,
  },
];

export const OTHERS_FACILITIES: Facility[] = [
  {
    name: '대중교통',
    default: <PublicTransportDefaultIcon />,
    none: <PublicTransportNoneIcon />,
  },
  {
    name: '출입통로',
    default: <EntranceDefaultIcon />,
    none: <EntranceNoneIcon />,
  },
  {
    name: '관람석',
    default: <SeatsDefaultIcon />,
    none: <SeatsNoneIcon />,
  },
];
