export const UniqueArray = {
    getUniqueArray(array) {
    const uniqueColorNumber = [...new Set(array.map(item => item.colorNumber))];
    const uniqueCrossSectionalArea = [...new Set(array.map(item => item.crossSectionalArea))];
    let resultArr = []
    for(let i = 0; i < uniqueColorNumber.length; i += 1 ) {
        for(let j = 0; j < uniqueCrossSectionalArea.length; j += 1){
            if ((array.filter(item => (item.colorNumber === uniqueColorNumber[i] && item.crossSectionalArea === uniqueCrossSectionalArea[j])).length) > 0) {
                resultArr.push({
                    colorNumber: uniqueColorNumber[i],
                    crossSectionalArea: uniqueCrossSectionalArea[j]
                })
            }
        }
    }
    return resultArr;
    }
}