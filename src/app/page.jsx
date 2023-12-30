import RecipeGrid from '@components/RecipeGrid';
import { getRecipes } from '@utils/getRecipes';
export default async function Home() {
  return (
    <main>
      <RecipeGrid sectionTitle='Popularne' recipes={await getRecipes()} />
    </main>
  );
}
