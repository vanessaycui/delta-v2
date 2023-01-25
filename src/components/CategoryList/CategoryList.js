import CategoryItem from "../CategoryItem/CategoryItem";

export default function CategoryList({ currentDashboard}) {
  const categoryList = currentDashboard.categories.map((category, idx) => (
    <CategoryItem
      currentDashboard={currentDashboard}
      key={idx}
      category={category}
 
    />
  ));
  return <tbody>{categoryList}</tbody>;
}
