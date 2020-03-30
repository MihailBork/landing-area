import React, {useState, useEffect} from "react";
import b_ from 'b_';
import TextList01 from '../dependent/TextList01';
import {Element} from 'react-scroll';
import './style.scss';

const list1 = {
    name: `КОНКУРС ДЕТСКИХ СОЧИНЕНИЙ "Котельниково - земля героев`,
    items: [`Описание`, `Цель`, `Участники`]
};

const list2 = {
    name: `КОНКУРС АРХИТЕКТУРНЫХ ПРОЕКТОВ`,
    items: [`Описание`, `Цель`, `Участники`]
};

export const b = b_.lock(`List02`);

const List02 = () => {
    return (
        <div className={b()}>
            <Element name={`list1`}>
                <TextList01 list={list1}/>
            </Element>
            <Element name={`list2`}>
                <TextList01 list={list2}/>
            </Element>
        </div>
    )
};

export default List02;