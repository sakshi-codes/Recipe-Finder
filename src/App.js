import {useState} from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import {Header,AppNameComponent,AppIcon,SearchComponent,SearchIcon,SearchInput} from './Components/header';
import {RecipeListContainer,RecipeContainer,RecipeName,CoverImage,IngridentsText,SeemoreText} from './Components/RecipeComponent';

const Ingredientlist=styled.table `
  margin-top: 1rem;
  background-color: #f0f0f0;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const APP_ID="399ab38a";
const APP_KEY="903f8244d423dfb8ea38b54e08c9031f";
const Container = styled.div`
display:flex;
flex-direction:column;
`;
const Placeholder=styled.img`
 padding-top:100px;
`;
const Text=styled.div`
font-size:24px;
padding: 0px 180\0px;
text-align: center;
font-weight:bold;
`;
const RecipeComponent = (props) => {
  const [show,setShow]=useState(false);
  const{recipeObj}=props;
return(
<>
  <Dialog open={show}>
  <DialogTitle>Ingredients</DialogTitle>
  <DialogContent>
    <RecipeName>{recipeObj.label}</RecipeName>
    <Ingredientlist>
      <thead>
        <th>Ingredients</th>
        <th>Weight</th>
      </thead>
      <tbody>
        {recipeObj.ingredients.map((ingredientObj)=>(
        <tr>
        <td>{ingredientObj.text}</td>
        <td>{ingredientObj.weight}</td>
        </tr>
        ))}
      </tbody>
    </Ingredientlist>
  </DialogContent>
  <DialogActions>
    <IngridentsText onClick ={()=>window.open(recipeObj.url)}>See More</IngridentsText>
    <SeemoreText onClick ={()=>setShow("")}>Close</SeemoreText>
  </DialogActions>
  </Dialog>
  <RecipeContainer>
        <CoverImage src={recipeObj.image}/>
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngridentsText onClick ={()=>setShow(true)}>Ingridents</IngridentsText>
        <SeemoreText onClick ={()=>window.open(recipeObj.url)}>See complete Recipe</SeemoreText>
</RecipeContainer>
</>
);
};

function App() {
  // timoutId->cuurentstate updatedTimeoutId->to update to currentstate
  const [timeoutID,updateTimeoutID]=useState();
  const [recipeList,updateRecipeList]=useState([]);
  const  fetchRecipe = async(searchString) =>{
    const response = await Axios.get(
      `https://www.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    updateRecipeList(response.data.hits);
  };
  const onTextChage=(event)=>{
    clearTimeout(timeoutID)
    const timeout=setTimeout(()=> fetchRecipe(event.target.value),500);
    updateTimeoutID(timeout);
  };
  return (
  <Container>
    <Header>
      <AppNameComponent>
        <AppIcon src="chef-hat.png"/>
        Recipe Finder
      </AppNameComponent>
      <SearchComponent>
      <SearchIcon src="search .png"/>
      <SearchInput placeholder="Search Recipe" onChange={onTextChage}/>
      </SearchComponent>
    </Header>
    <RecipeListContainer>
    {recipeList.length?
        recipeList.map((recipeObj)=>(
        <RecipeComponent recipeObj={recipeObj.recipe}/>
        )):<><Placeholder src="bg.jpg" /><Text>Got a few slices of leftover bread, an odd onion in your cupboard and some milk in the fridge? Our recipe finder tool will show you all the things you can make, so none of your food goes to waste, with only a few added ingredients needed.</Text></>}
    </RecipeListContainer>
  </Container>
  );
}

export default App;
