import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoryList.css"

export default function CategoryList({ currentDashboard}) {
  const categoryList = currentDashboard.categories.map((category, idx) => (
    <CategoryItem
      currentDashboard={currentDashboard}
      key={idx}
      category={category}
 
    />
  ));
  return <>{categoryList}</>;
}
