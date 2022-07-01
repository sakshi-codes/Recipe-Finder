import styled from "styled-components";
export const RecipeListContainer=styled.div`
display:flex;
flex-direction: row;
flex-wrap:wrap;
padding: 30px;
gap:20px;
justify-content:space-evenly;

`;
export  const RecipeContainer=styled.div`
display: flex;
flex-direction:column;
width:300px;
padding: 10px;
box-shadow: 0 3px 10px 0 #aaa;
`;
export const CoverImage =styled.img`
height: 200px;
object-fit:cover;
`;
export const RecipeName =styled.span`
font-size:18px;
font-weight: 600;
text-align:center;
color: black;
margin: 10px 0;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;
export  const IngridentsText =styled.span`
font-size:18px;
border: solid 2px green;
color: black;
cursor: pointer;
padding: 10px 15 px;
border-radius:4px;
color: green;
text-align: center;
margin-bottom: 12px;
`;
export const SeemoreText =styled(IngridentsText)`

color: #eb3300;
border: solid 2px #eb3300;
`;