
import Section from "./Section";
import CozyButton from "../assets/svg/Button";
import { useRef, useEffect, useState } from 'react';


const Hero = () => {
    const videoContainerRef = useRef(null);
    const videoRefs = useRef([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const videos = [
        {
            src: "/hero.mp4", // Replace with your video URL or path
            text: {
                title: "",
                description: "",
            },
        },
        {
            src: "/hero2.mp4", // Replace with your video URL or path
            text: {
                title: "",
                description: "",
            },
        },
        {
            src: "/v1.mp4", // Replace with your video URL or path
            text: {
                title: "",
                description: "",
            },
        },
        {
            src: "/v2.mp4", // Replace with your video URL or path
            text: {
                title: "",
                description: "",
            },
        },
    ];

    useEffect(() => {
        const playVideo = (index) => {
            if (videoRefs.current[index]) {
                const videoRef = videoRefs.current[index];
                videoRef.muted = true;
                videoRef.loop = false; // Important: Don't loop individually
                videoRef.autoplay = true;
                videoRef.playsInline = true;

                videoRef.onended = () => {
                    const nextIndex = (index + 1) % videos.length;
                    setCurrentVideoIndex(nextIndex);
                    playVideo(nextIndex);
                    scrollToVideo(nextIndex);
                };

                videoRef.play().catch(error => {
                    console.error("Autoplay prevented:", error);
                });
            }
        };

        const scrollToVideo = (index) => {
            if (videoContainerRef.current && videoRefs.current[0]) { 
                const videoWidth = videoRefs.current[0].offsetWidth;
                videoContainerRef.current.scrollLeft = videoWidth * index;
            }
        };


        playVideo(currentVideoIndex);

        return () => {
            videoRefs.current.forEach(videoRef => {
                if (videoRef) {
                    videoRef.onended = null;
                }
            });
        };
    }, [currentVideoIndex, videos.length]);


    const scrollLeft = () => {
        if (videoContainerRef.current) {
            videoContainerRef.current.scrollLeft -= 500;
        }
    };

    const scrollRight = () => {
        if (videoContainerRef.current) {
            videoContainerRef.current.scrollLeft += 500;
        }
    };

    return (
        <Section className="pt-[12rem] -mt-[5.25rem]" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="hero">
            <div className="container relative">
                <div className="relative z-1 max-w-[62rem] mx-auto text-center md:ml-37 lg:ml-69 mb-[4rem] md:mb-20 lg:mb-[6rem]">
                    <h1 className="font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem] mb-6 text-amber-900 font-serif">
                        ChaiWaai where Chai-ship matters!
                    </h1>
                    <p className="body-1 max-w-3xl mx-auto text-gray-800 font-code lg:mb-8">
                        From Kashmir to Kerala, every region has its own chai specialty, uniting people with diverse flavors. At CHAIWAAI, we aspire to be a global symbol of joyful moments and meaningful connections. More than a tea shop, it’s a sanctuary where laughter flows, bonds brew, and every sip tells a story. Whether you’re seeking calm or celebrating life’s joys, CHAIWAAI transforms tea-time into a cherished ritual. Join us and create new Chaiships over the perfect cup of tea!
                    </p>
                    <CozyButton onClick={()=>window.location.href='/about'}>
                        Explore more!
                    </CozyButton>
                </div>

                <div className="relative w-full md:ml-30 overflow-x-auto scroll-smooth" ref={videoContainerRef}>
                    <div className="flex">
                        {videos.map((video, index) => (
                            <div key={index} className="relative w-full aspect-video shrink-0 mr-4">
                                <video
                                    ref={el => videoRefs.current[index] = el}
                                    src={video.src}
                                    playsInline
                                    className="w-full h-full object-cover"
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-transparent p-8 rounded-lg max-w-md text-white">
                                        <h2 className="text-3xl font-bold mb-4">{video.text.title}</h2>
                                        <p className="text-lg">{video.text.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={scrollLeft} className="px-4 py-2 bg-white rounded-l">
                        &lt;
                    </button>
                    <button onClick={scrollRight} className="px-4 py-2 bg-white rounded-r">
                        &gt;
                    </button>
                </div>
            </div>
        </Section>
    );
};

export default Hero;

