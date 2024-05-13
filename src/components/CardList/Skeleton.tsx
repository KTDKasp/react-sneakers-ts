import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader 
    speed={2}
    width={210}
    height={260}
    viewBox="0 0 210 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ededed"
    {...props}
  >
    <rect x="30" y="35" rx="10" ry="10" width="150" height="90" /> 
    <rect x="30" y="143" rx="5" ry="5" width="150" height="15" /> 
    <rect x="30" y="163" rx="5" ry="5" width="94" height="15" /> 
    <rect x="55" y="175" rx="0" ry="0" width="4" height="1" /> 
    <rect x="30" y="201" rx="5" ry="5" width="80" height="25" /> 
    <rect x="146" y="195" rx="7" ry="7" width="32" height="32" /> 
    <circle cx="81" cy="284" r="25" />
  </ContentLoader>
);

export default Skeleton;

