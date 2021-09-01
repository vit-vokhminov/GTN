/*
 * Spanish layouts by Paco Alcantara (https://github.com/pacoalcantara)
 * Based on: http://ascii-table.com/keyboard.php/171 and http://ascii-table.com/keyboard.php/071-2
 */
const spanish = {
    acronim: 'es_ES',
    default: [
        "\u007c 1 2 3 4 5 6 7 8 9 0 ' \u00bf {bksp}",
        '{@} q w e r t y u i o p \u0301 +',
        '{tab} a s d f g h j k l \u00f1 \u007b \u007d {enter}',
        '{shift} < z x c v b n m , . - {shift}',
        '{lang} {space} {?!{}~}',
    ],
    shift: [
        '\u00b0 ! " # $ % & / ( ) = ? \u00a1 {bksp}',
        '{@} Q W E R T Y U I O P \u0308 *',
        '{tab} A S D F G H J K L \u00d1 \u005b \u005d {enter}',
        '{shift} > Z X C V B N M ; : _ {shift}',
        '{lang} {space} {?!{}~}',
    ],
};

export default spanish;
