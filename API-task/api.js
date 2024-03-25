const axios = require("axios");

async function searchVacancies(keyword) {
  try {
    const response = await axios.get("https://api.hh.ru/vacancies", {
      params: {
        text: keyword,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return response.data.items;
  } catch (error) {
    console.error("Ошибка при получении вакансий:", error.message);
    return [];
  }
}

async function main() {
  const keyword = "Сварщик";
  const vacancies = await searchVacancies(keyword);

  if (vacancies.length > 0) {
    console.log("Найдены вакансии:");
    vacancies.forEach((vacancy, index) => {
      console.log(
        `${index + 1}. ${vacancy.name} - ${
          vacancy.salary ? vacancy.salary.from : "З/П не указана"
        }`
      );
    });
  } else {
    console.log("По вашему запросу вакансии не найдены");
  }
}

main();
