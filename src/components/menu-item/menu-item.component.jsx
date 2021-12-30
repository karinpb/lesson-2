import React from "react";
import { useNavigate } from "react-router-dom";
import "./menu-item.styles.scss"

// const MenuItem = ({title, imageUrl,size}) => (
//     <div className={ `${size} menu-item`}>

//     <div className="background-image" style={{
//         backgroundImage: `url(${imageUrl})`
//     }}></div>
//     <div className='content'>
//       <div className='title'>{title.toUpperCase()}</div>
//       <span className='subtitle'>SHOP NOW</span>
//     </div>
//   </div>
// );

// export default withRouter(MenuItem);

export default function MenuItem({ title, imageUrl, size, linkUrl }) {

  let navigate = useNavigate();
  
  function handleClick() {
    // TODO add relative current URL
    navigate(linkUrl);
  }

  return (
    <div className={`${size} menu-item`} onClick={handleClick}>

      <div className="background-image" style={{
        backgroundImage: `url(${imageUrl})`
      }}></div>
      <div className='content'>
        <div className='title'>{title.toUpperCase()}</div>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>);
}