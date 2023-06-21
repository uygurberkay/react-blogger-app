import React, { useEffect, useState } from 'react'
import {Post} from '../components/Post';
import {Footer} from '../components/Footer';
import '../IndexPage.css';

export const IndexPage = () => {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div className="main-page">
      <section className="hero-section">
        <div className="hero-image">
          {/* <video autoPlay loop muted>
            <source src="../img/istockphoto-946257202-640_adpp_is.mp4" type="video/mp4" />
          </video> */}
        </div>
      </section>
      <section className="featured-destinations">
        <h2>Featured Destinations</h2>
        <>
          {posts.length > 0 && posts.map(post => (
            <Post {...post} />
          ))}
        </> 
      </section>
         
      < Footer />
    </div>
  )
}