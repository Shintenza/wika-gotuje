import RecipeGrid from '@components/RecipeGrid';
export default function Home() {
  const returnRecipes = () => {
    const recipes = [];
    const recipeDetails = {
      recipeImg:
        'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      reviewAvg: 4.28,
      title: 'Spaghetti Bolognese',
      authorImg:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      authorName: 'Stefania Kurwigrzmot',
      difficulty: 'Łatwy',
      reviewCount: 2137,
      commentCount: 69,
      date: '02.11.2023',
      time: 90,
      isLiked: false,
      id: 2137 
    };

    for (let i = 0; i < 3; i++) {
      recipes.push(recipeDetails);
    }
    return recipes;
  };
  return (
    <main>
      <RecipeGrid sectionTitle="Popularne" recipes={returnRecipes()} />
    </main>
  );
}
