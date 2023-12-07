import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limit?: number; // ?: Para que typescript sepa que es opcional

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number;// ?: Para que typescript sepa que es opcional
}