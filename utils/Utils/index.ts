import ObjectUtils from "./ObjectUtils";
import StringUtils from "./StringUtils";

export default class Utils
{
    private constructor () {};

    public static Object = ObjectUtils;

    public static String = StringUtils;

    public static isHexString = Utils.String.isHex;

    public static copySerializable = Utils.Object.copySerializable;
}