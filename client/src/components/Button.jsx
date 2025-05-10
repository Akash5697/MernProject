import React from 'react'
import "../components/Button.css"

const Button = () => {
  return (
    <div>
       <div className="btn-group">
          <a href="/contact">
            <button className="btn">connect now</button>
          </a>
          <a href="/no-access">
            <button className="btn secondary-btn">learn more</button>
          </a>
        </div>
    </div>
  )
}

export default Button
