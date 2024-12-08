export default interface DataModel {
  id: number;
  symbol: string;
  romaji: string;
  category: "hiragana" | "katakana";
  type: "basic" | "diacritic" | "combination";
  column: string;
  hint?: string;
}
