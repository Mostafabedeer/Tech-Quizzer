function StartScreen({ dispatch }) {
  return (
    <div className='start'>
      <h3>
        Ary you ready
        <img className='ready_emoji' src='readyEmoji.webp' alt='smile emoji' />?
      </h3>

      <button className='btn-play' onClick={() => dispatch({ type: "active" })}>
        S T A R T
        <div id='clip'>
          <div id='leftTop' className='corner'></div>
          <div id='rightBottom' className='corner'></div>
          <div id='rightTop' className='corner'></div>
          <div id='leftBottom' className='corner'></div>
        </div>
        <span id='rightArrow' className='arrow'></span>
        <span id='leftArrow' className='arrow'></span>
      </button>
    </div>
  );
}

export default StartScreen;
