import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export default function Loading({ loading }: { loading: boolean }) {
    if (!loading) {
        return
    }
    return (
        <div className="m-auto">
            <FontAwesomeIcon icon={faSpinner} size="xl" spin />
        </div>
    );
}
