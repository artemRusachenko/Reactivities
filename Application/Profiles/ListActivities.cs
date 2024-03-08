using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query:IRequest<Result<List<UserActivityDto>>>
        {
            public string Predicate { get; set; }//past  hosting future=by default
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {   
                var query = _context.ActivityAttendees
                    .Where(x => x.AppUser.UserName == request.UserName)
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                    .OrderBy(x => x.Date)
                    .AsQueryable();


                switch(request.Predicate)
                {
                    case "past":
                        query.Where(x => x.Date <= DateTime.UtcNow);
                        break;
                    case "hosting":
                        query.Where(x => x.IsHost);
                        break;
                    default:
                        query.Where(x => x.Date >= DateTime.UtcNow);
                        break;
                }
                var activities = await query.ToListAsync();
                return Result<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}