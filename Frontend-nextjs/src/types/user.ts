import { RoleType } from "@/types/generated-zod/schemas/models/Role.schema";
import { UserType } from "@/types/generated-zod/schemas/models/User.schema";

export type AdminUserType = Omit<UserType, "roles"> & {
    roles: RoleType[];
};
