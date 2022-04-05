import React, { useState, useRef, useEffect } from "react";
import "./App.css";
type DataTypes = {
    name: string;
    id: number;
};

const App = (): JSX.Element => {
    const [isTopButton, setIsTopButton] = useState<boolean>(false);
    const [datas, setData] = useState<DataTypes[]>([
        { name: "기린", id: 0 },
        { name: "강아지", id: 1 },
        { name: "토끼", id: 2 },
        { name: "호랑이", id: 3 },
        { name: "사자", id: 4 },
    ]);

    // ref
    const observerRef = useRef<IntersectionObserver>();
    const target = useRef<HTMLDivElement>(null);

    // useEffect
    useEffect(() => {
        getInfo();

        window.addEventListener("scroll", handleScrollThrottle);

        return () => {
            window.removeEventListener("scroll", handleScrollThrottle);
        };
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
        target.current && observerRef.current.observe(target.current);
    }, [datas]);

    // function
    const getInfo = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setData((curInfoArray) => [
            ...curInfoArray,
            ...[
                { name: "기린", id: 0 },
                { name: "강아지", id: 1 },
                { name: "토끼", id: 2 },
                { name: "호랑이", id: 3 },
                { name: "사자", id: 4 },
            ],
        ]); // state에 추가

        console.log("info data add...");
    };

    // IntersectionObserver 설정
    const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 관찰하고 있는 entry가 화면에 보여지는 경우
                io.unobserve(entry.target); // entry 관찰 해제
                getInfo(); // 데이터 가져오기
            }
        });
    };

    const topScroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleScrollThrottle = (e: any) => {
        console.log(window.scrollY);
        if (window.scrollY > 200) {
            setIsTopButton(true);
        } else {
            setIsTopButton(false);
        }
    };

    return (
        <>
            <div className="wrapper">
                {datas.map((animal, index) => {
                    return (
                        <div key={index} className={`card`}>
                            <p>아이디: {animal.id}</p>
                            <p>이름:{animal.name}</p>
                        </div>
                    );
                })}

                <div ref={target} style={{ height: "150px" }}>
                    <div style={{ height: "150px" }}>로딩중....</div>
                </div>
            </div>
            {isTopButton && (
                <button
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        right: "40px",
                        width: "70px",
                        height: "70px",
                        borderRadius: "35px",
                        border: "none",
                        background: "#23fa5c",
                        color: "white",
                    }}
                    onClick={topScroll}
                >
                    ▲
                </button>
            )}
        </>
    );
};

export default App;
