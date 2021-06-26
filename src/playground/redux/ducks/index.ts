const UPDATE_ITEM = "app/itesmsList/UPDATE_ITEM";

interface action {
  type: string;
  payload: Object;
}
export default function reducer(
  state = { item: "there would be an item here" },
  action: action
) {
  if (action.type === UPDATE_ITEM) return { item: action.payload["item"] };
  return state;
}

export function updateItem(itemName: string): action {
  return {
    type: UPDATE_ITEM,
    payload: {
      item: itemName,
    },
  };
}
