export const int2roman = (original: number): string => {
    if (original < 1 || original > 3999) {
        throw new Error('Error: Input integer limited to 1 through 3,999');
    }

    const numerals = [
        ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'],
        ['x', 'xx', 'xxx', 'xl', 'l', 'lx', 'lxx', 'lxxx', 'xc'],
        ['c', 'cc', 'ccc', 'cd', 'd', 'dc', 'dcc', 'dccc', 'cm'],
        ['m', 'mm', 'mmm'],
    ];

    const digits = Math.round(original).toString().split('');
    let position = digits.length - 1;

    return digits.reduce((roman, digit) => {
        if (digit !== '0') {
            roman += numerals[position][parseInt(digit) - 1];
        }

        position -= 1;

        return roman;
    }, '');
};
