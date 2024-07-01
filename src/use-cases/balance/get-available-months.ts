import {
  AvailableDatesProps,
  MonthsAvailableResponse,
} from "../../controllers/helpers/types";
import { UserNotFoundError } from "../../errors/user";
import { PostgresGetBalancesByUserIdRepository } from "../../repositories/postgres/balance/get-balances-by-user-id";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";

export class GetAvailableMonthsUseCase {
  async execute(userId: string): Promise<MonthsAvailableResponse> {
    const getUserByUserIdRepository = new PostgresGetUserByIdRepository();

    const user = await getUserByUserIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const months: string[] = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const getBalanceByUserIdRepository =
      new PostgresGetBalancesByUserIdRepository();
    const { balances } = await getBalanceByUserIdRepository.execute(userId);

    const availableDates = balances.reduce(
      (acc, balance): AvailableDatesProps => {
        const month = balance.createdAt.getUTCMonth();
        const year = balance.createdAt.getUTCFullYear();

        if (!acc[year]) {
          acc[year] = {
            months: [],
            monthsIndex: [],
          };
        }

        if (!acc[year].months.includes(months[month])) {
          acc[year].months.push(months[month]);
          acc[year].monthsIndex.push(month);
        }

        return acc;
      },
      {} as AvailableDatesProps
    );

    return {
      available_dates: availableDates,
    };
  }
}
