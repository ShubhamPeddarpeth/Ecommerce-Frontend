'use client';
import React, { useState, useEffect } from 'react';
import { Slider } from '../../components/Slider/Slider';
import Products from './products/homeProducts';

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-full">
        <video
          src="video1.mp4 "
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        ></video>
      </div>
      <Slider />
      <Products />
    </div>
  );
}
