import { orderAlpha , orderWeightMin , orderWeightMax} from "../Order/Order.js";

const initialState= {
 dogs: [],
 dogDetail: {},
 temperaments: [],
 actualPage: 1,
};

export default function reducer(state = initialState, action){
        switch(action.type){

                case "GET_ALL_BREED_DOG" : 
                return{
                        ...state,
                        actualPage : 1,
                        dogs : action.payload,
                        
                    }

                case "GET_NAME_BREED_DOG":
                    return {
                        ...state,
                        actualPage : 1,
                        dogs: action.payload,
                        
                    }

                case "GET_ALL_TEMPERAMENTS" :
                    return {
                        ...state,
                        temperaments : action.payload
                    }

                case "GET_DOG_BBDD":
                    return {
                        ...state,
                        actualPage : 1,
                        dogs: action.payload,
                        
                    }

                case "GET_BREED_API":
                    return {
                        ...state,
                        actualPage : 1,
                        dogs: action.payload,
                        
                    }

                case "GET_DOGS_FOR_TEMP":
                    return { 
                        ...state,
                        actualPage : 1,
                         dogs: action.payload ,
                       
                        };

                case "GET_DETAIL": 
                    return {
                        ...state,
                        actualPage:1,
                        dogDetail:action.payload,
                       

                    }

                case "POST_BREED_DOG":
                    return {
                        ...state,
                    }

                case "ORDER_ASCENDING":
                    return {
                        ...state,
                        dogs : state.dogs.slice().sort(orderAlpha)
                    }

                case "ORDER_DESCENDING": 
                     return {
                        ...state,
                        dogs : state.dogs.slice().sort(orderAlpha).reverse()
                    }

                case "ORDER_WEIGHT_MIN_ASC":
                    return {
                        ...state,
                        dogs : state.dogs.slice().sort(orderWeightMin)
                    }

                case "ORDER_WEIGHT_MIN_DESC" :
                    return{
                        ...state,
                        dogs : state.dogs.slice().sort(orderWeightMin).reverse()
                    }
                   
                case "ORDER_WEIGHT_MAX_ASC" :
                    return{
                        ...state,
                        dogs : state.dogs.slice().sort(orderWeightMax)
                    }  
                    
                case "ORDER_WEIGHT_MAX_DESC":
                    return {
                        ...state,
                        dogs : state.dogs.slice().sort(orderWeightMax).reverse()
                    }  
                    
                case "CHANGE_PAGE":
                    return {
                        ...state, 
                        actualPage: action.payload
                    } 

          default:
            return {
                 ...state
            }

        }
}