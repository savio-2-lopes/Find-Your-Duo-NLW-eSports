import logoImg from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { MagnifyingGlassPlus } from "phosphor-react";

import Carousel from "react-multi-carousel";
import api from "../services/api";

import "react-multi-carousel/lib/styles.css";
// import Modal from "../components/Modal";
import { GameBanner } from "../components/GameBanner";
import { CreatedAdBanner } from "../components/CreatedAdBanner";
import { Spinner } from "../components/Spinner";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

export default function Home() {
  const [dataGames, setDataGames] = useState<Game[]>([]);
  // const [selectedId, setSelectedId] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    api
      .get("/games")
      .then((response) => {
        setDataGames(response.data);
        setLoading(true);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [api, dataGames]);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-clip-text bg-nlw-gradient">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="grid mt-16 items-center justify-center gap-[24px]">
        {loading ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType="desktop"
          >
            {dataGames ? (
              dataGames.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <GameBanner
                      bannerUrl={item.bannerUrl}
                      title={item.title}
                      adsCount={item._count.ads}
                    />
                  </div>
                );
              })
            ) : (
              <h1>Sem dados</h1>
            )}
          </Carousel>
        ) : (
          <div className="mt-10 mb-10 text-white grid justify-center">
            <Spinner />
          </div>
        )}
      </div>

      {/* {showModal && (
            <Modal
              id={Number(selectedId)}
              closeModal={() => setShowModal(false)}
            />
          )} 
      */}

      <CreatedAdBanner />
    </div>
  );
}
