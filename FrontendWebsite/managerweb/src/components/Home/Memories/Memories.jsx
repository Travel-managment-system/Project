import React from 'react';
import Slider from 'react-slick';
import './Memories.css'; // Import the CSS file
import pic1 from './../../../Assests/Memories/OIP (1).jpeg'
import pic2 from './../../../Assests/Memories/download (1).jpeg'
import pic3 from './../../../Assests/Memories/download (2).jpeg'
import pic4 from './../../../Assests/Memories/download.jpeg'

const memoriesData = [
  {
    title: "A Walk in the Woods",
    text: "A wonderful walk through the serene forest.",
    image: pic2,
  },
  {
    title: "Beach Sunset",
    text: "Witnessing the breathtaking beach sunset.",
    image: pic3,
  },
  {
    title: "Mountain Adventure",
    text: "An unforgettable mountain adventure.",
    image: pic4,
  },
  {
    title: "I love paris",
    text: "Loved the people from here",
    image: pic1,
  },
];

const Memories = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="memories-container">
        <h3>Memories from our Loving Users</h3>
      <Slider {...settings}>
        {memoriesData.map((memory, index) => (
          <div key={index} className="memory-item">
            <img src={memory.image} alt={memory.title} className="memory-image" />
            <div className="memory-text">
              <h3>{memory.title}</h3>
              <p>{memory.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Memories;
