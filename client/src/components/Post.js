import React from 'react'

export const Post = () => {
  return (
    <div className="post">
        <div className="image">
          <img src="https://concorecdn.jollytur.com/concore/media/2018/52/Antalya-otelleri.jpg" alt="Antalya" />
        </div>
        <div className="texts">
          <h2>ANTALYA’DA GEZİLECEK YERLER</h2>
          <p className="info">
            <a href=" " className="author">Berkay Uygur</a>
            <time>17.06.2023 17:57</time>
          </p>
          <p className='summary'>'Dünyada 2 tür insan vardır: Antalya’yı sevenler ve sevmeyenler. Vıcık vıcık turist kaynayan sahillerin ve her şey dahilci akını etkisiyle ciddi önyargılarla gittiğimiz Antalya'dan, Türkiye'de yaşanacak en güzel yer Antalya diyerek döndük.'</p>
        </div>
      </div>
  )
}
