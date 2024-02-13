using System.Security.Cryptography.X509Certificates;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Interfaces
{
    public class SetMain
    {
        public class Comand : IRequest<Result<Unit>>{
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Comand, Result<Unit>>{
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
            _context = context;
            _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Comand request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if(user == null) return null; 

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if(photo == null) return null;

                var currentMain = user.Photos.FirstOrDefault(x => x.isMain);

                if(currentMain != null) currentMain.isMain = false;

                photo.isMain = true;

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem setting maainn photo");
            }
        }
    }
}