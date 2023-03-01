using AutoMapper;
using CompanyAPI.Data;

namespace CompanyAPI.Models.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegister, ApplicationUser>().ReverseMap();
            CreateMap<EmployeeDTO, Employee>().ReverseMap();
            CreateMap<CompanyDTO, Company>().ReverseMap();
        }
    }
}
