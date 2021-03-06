import * as d3 from 'd3';

export const chart = (array: any[], category: string, xScale: d3.ScaleLinear<number, number, never>) => {

    //CREATE THE OBJECT
    const countCategories = (categoryMap: any, node: any) => {
        const gId = node.data[category];
        const count: number = categoryMap[gId] || 0;
        return {
            ...categoryMap,
            [gId]: count + 1,
        }
    }
    //GET ALL THE CATEGORIES AND COUNTED ITEMS
    const categories = array.reduce(countCategories, {})

    //TRANSFORM IT TO AN ARRAY OF OBJECTS
    let va = Object.keys(categories)
        .map((key: any) => {
            return {
                data: {
                    category: key,
                    items: categories[key]
                },
                index: 0,
                value: categories[key],
                x0: 0,
                x1: 0
            }
        })
        .sort((a: any, b: any) => {
            return a.data.category.localeCompare(b.data.category)
        })
        .map((d: any, i: number) => {
            d.index = i;
            return d;
        })

    //get the total of items
    const chartTotal: number = d3.sum(va, (d: any) => d.data.items);

    if (va.length > 10) {
        va.sort((a: any, b: any) => b.value - a.value)
        let newArr = va.slice(0, 9);
        const newObj = va.slice(9, va.length)
            .reduce((objectMap: any, node: any) => {
                const counter = objectMap.value + node.value
                return {
                    ...objectMap,
                    data: {
                        category: "others",
                        items: counter
                    },
                    index: 0,
                    value: counter,
                    x0: 0,
                    x1: 0
                }
            })
        va = [...newArr, newObj];
    }
    //calculate the position of the objects
    let pos = 0;
    return va.map((d: any, index: number) => {
        d.x1 = xScale((d.data.items / chartTotal) * 100);
        d.x0 = pos;
        d.index = index;
        pos += d.x1;
        return d;
    })

}
