import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import cardLogo from "../../assets/card-logo.svg";
import sim2 from "../../assets/sim2.svg";

const CardSlider: React.FC = () => {
  return (
    <div className="relative">
      <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src={sim2}
              alt="simcard"
              width={40}
              height={60}
              className="absolute left-1/2 -translate-x-1/2 rotate-90 top-[10%] w-[40px] h-[60px] select-none"
            />
            <span className="absolute bottom-[45%] left-1/2 -translate-x-1/2 select-none">bank, but lovely</span>
            <img
              src={cardLogo}
              alt="cardLogo"
              width={60}
              height={40}
              className="absolute bottom-8 left-8 select-none"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src={sim2}
              alt="simcard"
              width={40}
              height={60}
              className="absolute left-1/2 -translate-x-1/2 rotate-90 top-[10%] w-[40px] h-[60px] select-none"
            />
            <span className="absolute bottom-[45%] left-1/2 -translate-x-1/2 select-none">bank, but lovely</span>
            <img
              src={cardLogo}
              alt="cardLogo"
              width={60}
              height={40}
              className="absolute bottom-8 left-8 select-none"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={sim2}
            alt="simcard"
            width={40}
            height={60}
            className="absolute left-1/2 -translate-x-1/2 rotate-90 top-[10%] w-[40px] h-[60px] select-none"
          />
          <div className="relative h-full w-full">
            <span className="absolute bottom-[45%] left-1/2 -translate-x-1/2 select-none">bank, but lovely</span>
            <img
              src={cardLogo}
              alt="cardLogo"
              width={60}
              height={40}
              className="absolute bottom-8 left-8 select-none"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CardSlider;
