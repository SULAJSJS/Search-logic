import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={218}
    height={330}
    viewBox="0 0 218 330"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="NaN" rx="0" ry="0" width="196" height="NaN" /> 
    <rect x="0" y="0" rx="5" ry="5" width="218" height="160" /> 
    <rect x="2" y="172" rx="0" ry="0" width="150" height="29" /> 
    <rect x="2" y="220" rx="0" ry="0" width="218" height="17" /> 
    <rect x="9" y="280" rx="0" ry="0" width="151" height="23" />
  </ContentLoader>
)

export default Skeleton;

