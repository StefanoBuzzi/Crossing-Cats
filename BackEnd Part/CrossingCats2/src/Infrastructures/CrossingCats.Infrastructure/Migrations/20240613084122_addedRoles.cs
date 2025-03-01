using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrossingCats.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addedRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Player_User_AccountId",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "TotalCarGames",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "TotalCatGames",
                table: "Player");

            migrationBuilder.RenameColumn(
                name: "TotalGames",
                table: "Player",
                newName: "Role");

            migrationBuilder.AddColumn<int>(
                name: "TotalCarGames",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalCatGames",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalGames",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Player_User_AccountId",
                table: "Player",
                column: "AccountId",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Player_User_AccountId",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "TotalCarGames",
                table: "User");

            migrationBuilder.DropColumn(
                name: "TotalCatGames",
                table: "User");

            migrationBuilder.DropColumn(
                name: "TotalGames",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Player",
                newName: "TotalGames");

            migrationBuilder.AddColumn<int>(
                name: "TotalCarGames",
                table: "Player",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalCatGames",
                table: "Player",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Player_User_AccountId",
                table: "Player",
                column: "AccountId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
