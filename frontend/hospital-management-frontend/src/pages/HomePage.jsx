import React from 'react';
import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import Footer from '../components/home/Footer';
import { Box } from '@mui/material';

function HomePage() {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </Box>
  );
}

export default HomePage;
