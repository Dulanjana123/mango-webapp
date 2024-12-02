import { orderHeader } from "../../types/interfaces";

export default interface OrderListProps {
    isLoading: boolean;
    orderData: orderHeader[];
}