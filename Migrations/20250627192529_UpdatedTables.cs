using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace CalorieTracker.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_Meals_MealId",
                table: "Foods");

            migrationBuilder.DropForeignKey(
                name: "FK_MealNames_Meals_MealId",
                table: "MealNames");

            migrationBuilder.DropIndex(
                name: "IX_MealNames_MealId",
                table: "MealNames");

            migrationBuilder.DropIndex(
                name: "IX_Foods_MealId",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "MealId",
                table: "MealNames");

            migrationBuilder.DropColumn(
                name: "MealId",
                table: "Foods");

            migrationBuilder.AddColumn<string>(
                name: "FoodId",
                table: "Meals",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "MealNameId",
                table: "Meals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "UserMeals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    MealNameId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMeals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMeals_MealNames_MealNameId",
                        column: x => x.MealNameId,
                        principalTable: "MealNames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMeals_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_FoodId",
                table: "Meals",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_MealNameId",
                table: "Meals",
                column: "MealNameId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMeals_MealNameId",
                table: "UserMeals",
                column: "MealNameId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMeals_UserId",
                table: "UserMeals",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Foods_FoodId",
                table: "Meals",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_MealNames_MealNameId",
                table: "Meals",
                column: "MealNameId",
                principalTable: "MealNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Foods_FoodId",
                table: "Meals");

            migrationBuilder.DropForeignKey(
                name: "FK_Meals_MealNames_MealNameId",
                table: "Meals");

            migrationBuilder.DropTable(
                name: "UserMeals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_FoodId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_MealNameId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "FoodId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "MealNameId",
                table: "Meals");

            migrationBuilder.AddColumn<int>(
                name: "MealId",
                table: "MealNames",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MealId",
                table: "Foods",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MealNames_MealId",
                table: "MealNames",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_Foods_MealId",
                table: "Foods",
                column: "MealId");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_Meals_MealId",
                table: "Foods",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MealNames_Meals_MealId",
                table: "MealNames",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
