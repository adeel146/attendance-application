import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import CustomTable from "../../Components/CommonComponents/CommonTable/CustomTable";
import { commonPageSize, UsersListHeader } from "../../constants/constants";
import { customSpinner } from "../../constants/utilis";
import { getUsersList } from "../../services/usersServices";

function UsersList({ business_id }) {
  const [pageSize, setpageSize] = useState(commonPageSize);
  const [page_index, setpage_index] = useState(0);
  const { data: usersList, isLoading } = useQuery({
    queryKey: ["usersList", { pageSize, page_index }],
    queryFn: () =>
      getUsersList({
        page_size: pageSize,
        page_index,
        business_id,
      }),
  });

  const data = React.useMemo(() => usersList?.data || [], [usersList?.data]);
  const columns = React.useMemo(UsersListHeader, []);

  return (
    <>
      <div>
        {isLoading ? (
          <div className="h-[50vh] flex justify-center items-center">
            {customSpinner()}
          </div>
        ) : (
          <div className="p-8">
            <div className="mt-2">
              <CustomTable
                data={data}
                columns={columns}
                setpageNumber={setpage_index}
                setpageSize={setpageSize}
                totalPages={usersList?.total_pages}
                page_number={usersList?.page_number}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UsersList;
