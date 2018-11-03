let round_up = (rounding_num, round_to) => {

    return rounding_num % round_to == 0 ? rounding_num : rounding_num + round_to - rounding_num % round_to

    // let num;
    // if (rounding_num % round_to == 0) {
    //     num = rounding_num;
    // } else {
    //     num = rounding_num + round_to - rounding_num % round_to;
    // }
    // return num


}

console.log(round_up(39, 10))