import React, {useState, useEffect} from "react";
import b_ from 'b_';
import cn from 'classnames';
import YouTube from 'react-youtube';

import './style.scss';

const PREVIEW_WIDTH = 240; //px
const PREVIEW_HEIGHT = 135; //px
const ACTIVE_WIDTH = 800; //px
const ACTIVE_HEIGHT = 450; //px
const X_MARGIN = 10; //px
const Y_MARGIN = 20; //px
const ANIMATION_DURATION = 500; //ms

const videos = [
    {
        link: `D7s8FAJapvo`,
    },
    {
        link: `QAJXqZKYT-g`,
    },
    {
        link: `a0m6DH2J27Q`,
    },
    {
        link: `ZA3tTAzGy5w`,
    },
    {
        link: `2jxf17kFXSg`,
    }
];

export const b = b_.lock(`Video01`);

const Video01 = () => {

    useEffect(() => {
        if (!process.browser) return;
        setScreenWidth(window.innerWidth);
    });

    const [screenWidth, setScreenWidth] = useState(0);
    const [selectedItem, setSelectedItem] = useState(0);
    const [isVideoPlayed, setVideoPlayedState] = useState(false);
    const [isWaitAnimation, setWaitAnimationState] = useState(false);
    const [player, setPlayer] = useState(null);
    const isSelectedItem = typeof selectedItem === `number`;
    const isListWide = listWidth > screenWidth;
    const listWidth = (PREVIEW_WIDTH + (X_MARGIN - 1)) * (isSelectedItem ? (videos.length - 1) : videos.length);
    const listOffset = isListWide ? 0 : ((screenWidth - listWidth) / 2);
    const activeItemOffset = (screenWidth - ACTIVE_WIDTH) / 2;
    const itemStyle = (index) => {
        const isActiveItem = selectedItem === index;

        const itemWidth = isActiveItem ? ACTIVE_WIDTH : PREVIEW_WIDTH;
        const itemHeight = isActiveItem ? ACTIVE_HEIGHT : PREVIEW_HEIGHT;

        let leftOffset;
        if (isActiveItem) {
            leftOffset = activeItemOffset;
        } else {
            leftOffset = selectedItem > index || !isSelectedItem
                ? (PREVIEW_WIDTH + X_MARGIN) * index
                : (PREVIEW_WIDTH + X_MARGIN) * (index - 1);
            leftOffset = leftOffset + listOffset;
        }

        const topOffset = isActiveItem ? 0 : ACTIVE_HEIGHT + Y_MARGIN;

        return {left: leftOffset, top: topOffset, width: itemWidth, height: itemHeight};
    };

    const playerOptions = {
        width: ACTIVE_WIDTH,
        height: ACTIVE_HEIGHT,
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };

    const onPlayerReady = (e) => {
        setPlayer(e.target);
        if (!isVideoPlayed) {
            e.target.pauseVideo();
        }
    };

    const selectItem = (index) => {
        if (selectedItem === index && isVideoPlayed) return;
        if (!isVideoPlayed && player) {
            setVideoPlayedState(true);
            player.playVideo();
        }
        setWaitAnimationState(true);
        setSelectedItem(index);
    };

    const afterAnimation = () => {

    };

    useEffect(() => {
        if (!isWaitAnimation) {
            afterAnimation();
            return;
        }
        ;
        const timer = setTimeout(() => {
            setWaitAnimationState(false);
        }, ANIMATION_DURATION);
        return () => {
            clearTimeout(timer);
        }
    }, [isWaitAnimation]);

    return (
        <div className={b()}>
            <div
                className={b(`list`)}
                style={{height: ACTIVE_HEIGHT + Y_MARGIN + PREVIEW_HEIGHT}}
            >
                <div className={cn(b(`list-controls`), {hidden: !isListWide})}>
                    <div className={b(`list-controls-scrollLeft`)}>
                        <div className={b(`list-controls-scrollLeft-icon`)}/>
                    </div>
                    <div className={b(`list-controls-scrollRight`)}>
                        <div className={b(`list-controls-scrollRight-icon`)}/>
                    </div>
                </div>
                {
                    videos.map((item, index) => (
                        <div
                            key={index}
                            className={cn(b(`list-item`), {
                                active: selectedItem === index,
                                played: selectedItem === index && isVideoPlayed
                            })}
                            style={itemStyle(index)}
                            onClick={() => {
                                selectItem(index)
                            }}
                        >
                            <img
                                className={
                                    cn(
                                        b(`list-item-preview`),
                                        {hidden: selectedItem === index && !isWaitAnimation && player && isVideoPlayed}
                                    )}
                                src={`https://img.youtube.com/vi/${item.link}/mqdefault.jpg`}/>
                            {
                                selectedItem === index &&
                                <YouTube
                                    videoId={item.link}
                                    opts={playerOptions}
                                    onReady={onPlayerReady}
                                />
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
};

export default Video01;