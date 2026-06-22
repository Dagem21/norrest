import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageNavigator({
    page,
    limit,
    totalPages,
    totalDocs,
    onPageChange,
    onLimitChange,
}: {
    page: number;
    limit: number;
    totalPages: number;
    totalDocs: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}) {
    return (
        <div className="flex justify-between items-center px-3 mt-3 text-sm text-taupe-600 dark:text-taupe-200">
            <p>
                Total : <span className="text-primary">{totalDocs ?? 0}</span>
            </p>

            <div className="flex items-center">
                <div className="flex items-center gap-1">
                    <select
                        className="bg-taupe-400 dark:bg-taupe-800 px-2 py-1 hover:bg-blue-700 text-white font-bold rounded"
                        onChange={(e) => {
                            onLimitChange(parseInt(e.target.value));
                        }}
                        value={limit}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                    </select>
                    <button
                        className="bg-taupe-400 dark:bg-taupe-800 px-2 py-1 hover:bg-blue-700 text-white font-bold rounded"
                        onClick={() => {
                            onPageChange(1);
                        }}
                        title="First page"
                    >
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </button>

                    <button
                        className="bg-taupe-400 dark:bg-taupe-800 px-2 py-1 hover:bg-blue-700 text-white font-bold rounded"
                        onClick={() => {
                            onPageChange(page > 1 ? page - 1 : 1);
                        }}
                        title="Previous page"
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    {page > 1 && (
                        <button
                            className="bg-taupe-400 dark:bg-taupe-800 px-2 py-1 hover:bg-blue-700 text-white font-bold rounded"
                            onClick={() => {
                                onPageChange(page > 1 ? page - 1 : 1);
                            }}
                            title={"Page " + (page - 1)}
                        >
                            {page - 1}
                        </button>
                    )}

                    <button className="bg-taupe-400 dark:bg-taupe-800 px-2 py-1 hover:bg-blue-700 text-white font-bold rounded">
                        {page}
                    </button>

                    {page < totalPages && (
                        <button
                            className="bg-taupe-400 dark:bg-taupe-800 px-2 py-1 hover:bg-blue-700 text-white font-bold rounded"
                            onClick={() => {
                                onPageChange(page < totalPages ? page + 1 : totalPages);
                            }}
                            title={"Page " + (page + 1)}
                        >
                            {page + 1}
                        </button>
                    )}
                    <button
                        className="bg-taupe-400 dark:bg-taupe-800 px-2 py-1 hover:bg-blue-700 text-white font-bold rounded"
                        onClick={() => {
                            onPageChange(page < totalPages ? page + 1 : totalPages);
                        }}
                        title="Next page"
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <button
                        className="bg-taupe-400 dark:bg-taupe-800 px-2 py-1 hover:bg-blue-700 text-white font-bold rounded"
                        onClick={() => {
                            onPageChange(page < totalPages ? page + 1 : totalPages);
                        }}
                        title="Last page"
                    >
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                </div>
            </div>
        </div>
    );
}
