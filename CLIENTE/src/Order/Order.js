export const orderAlpha = ( a,  b) =>{
    if(a.name < b.name) return -1 ;
    if(b.name < a.name) return 1;
    return 0;
}

export const orderWeightMin = ( a , b) =>{
 return a.weight_min - b.weight_min;
}

export const orderWeightMax = ( a , b) => {
    return a.weight_max - b.weight_max  
}

